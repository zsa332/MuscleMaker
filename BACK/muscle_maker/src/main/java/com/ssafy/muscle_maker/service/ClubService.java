package com.ssafy.muscle_maker.service;

import com.ssafy.muscle_maker.awsS3.S3Uploader;
import com.ssafy.muscle_maker.dto.calendar.CalendarResponse;
import com.ssafy.muscle_maker.dto.clubs.response.ClubCalendarResponse;
import com.ssafy.muscle_maker.dto.clubs.response.ClubMemberResponse;
import com.ssafy.muscle_maker.dto.clubs.request.ClubRegistRequest;
import com.ssafy.muscle_maker.dto.clubs.response.ClubResponse;
import com.ssafy.muscle_maker.entity.Calendar;
import com.ssafy.muscle_maker.entity.Club;
import com.ssafy.muscle_maker.entity.User;
import com.ssafy.muscle_maker.entity.UserClub;
import com.ssafy.muscle_maker.exception.CustomException;
import com.ssafy.muscle_maker.exception.ErrorCode;
import com.ssafy.muscle_maker.repository.CalendarRepository;
import com.ssafy.muscle_maker.repository.ClubRepository;
import com.ssafy.muscle_maker.repository.UserClubRepository;
import com.ssafy.muscle_maker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Period;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClubService {
    private final ClubRepository clubRepository;
    private final UserRepository userRepository;
    private final UserClubRepository userClubRepository;
    private final CalendarRepository calendarRepository;
    private final S3Uploader s3Uploader;

    @Transactional
    public User getUser(int userId){
        return userRepository.findByUserIdAndFlagFalse(userId).orElseThrow(()->new CustomException(ErrorCode.NO_EXIST_USER));
    }

    @Transactional
    public Club getClub(int clubId){
        return clubRepository.findClubByClubIdAndFlagFalse(clubId).orElseThrow(()-> new CustomException(ErrorCode.NO_EXIST_CLUB));
    }

    public List<ClubResponse> searchClub(String keyword){
        keyword = keyword.trim();
        List<ClubResponse> clubResponseList = new ArrayList<>();
        List<Club>  clubList = clubRepository.findByTitleContainingAndFlagFalse(keyword).orElseThrow(() ->
                new CustomException(ErrorCode.NO_EXIST_CLUB));
        for( Club club : clubList) clubResponseList.add(makeClubResponse(club));
        return clubResponseList;
    }

    // 클럽 정보가 주어졌을 때 새로운 클럽 등록(등록한 사람이 방장으로 자동 설정됨)
    public ClubResponse registerClub(ClubRegistRequest clubRegistRequest, MultipartFile img, int userId) throws IOException {

        if(!img.isEmpty()){
            String imgUrl = null;
            try {
                imgUrl = s3Uploader.upload(img,"club-images");
            } catch (IOException e) {
                throw new CustomException(ErrorCode.FILE_UPLOAD_ERROR);
            }
            clubRegistRequest.setImage(imgUrl);
        }

        User user = getUser(userId);

        //가입 클럽이 이미 존재하는 지 확인
        if(clubRegistRequest.isCategory()){
            if(user.isFoodClub()) throw new CustomException(ErrorCode.ALREADY_IN_FOOD_CLUB);

            user.setFoodClub(true);
        }
        else{
            if(user.isExerciseClub()) throw new CustomException(ErrorCode.ALREADY_IN_EXERCISE_CLUB);

            user.setExerciseClub(true);
        }

        if(clubRepository.existsByTitleContaining(clubRegistRequest.getTitle())) throw new CustomException(ErrorCode.ALREADY_SAME_TITLE);

        //유저 정보 업뎃
        userRepository.save(user);

        //club 생성
        Club club = clubRepository.save(Club.builder()
                .exp(0)
                .level(0)
                .title(clubRegistRequest.getTitle())
                .goal(clubRegistRequest.getGoal())
                .image(clubRegistRequest.getImage())
                .category(clubRegistRequest.isCategory())
                .successDays(0)
                .userClubs(new ArrayList<>())
                .build());

        // 방장 정보 userClub에 업뎃

        UserClub userClub = new UserClub().builder()
                .club(club)
                .user(user)
                .authority(0)
                .build();
        userClubRepository.save(userClub);

        List<UserClub> userClubs = new ArrayList<>();
        userClubs.add(userClub);
        club.setUserClubs(userClubs);

        //캘린더 정보 새로 생성
        calendarRepository.save(Calendar.builder()
                        .achieveCount(0)
                        .date(LocalDate.now())
                        .memberCount(1)
                        .club(club)
                .build());

        return makeClubResponse(club);
    }

    // 클럽 정보 수정(카테고리는 건들지 마세요)
    public ClubResponse updateClub(int userId, int clubId, ClubRegistRequest clubRegistRequest, MultipartFile img) throws IOException {
        if(!img.isEmpty()){
            String imgUrl = null;
            try {
                imgUrl = s3Uploader.upload(img,"club-images");
            } catch (IOException e) {
                throw new CustomException(ErrorCode.FILE_UPLOAD_ERROR);
            }
            clubRegistRequest.setImage(imgUrl);
        }

        User user = getUser(userId);
        Club club = getClub(clubId);

        if(userClubRepository.findByUserAndClubAndFlagFalse(user, club)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST_USER_CLUB))
                .getAuthority() != 0
        ) throw new CustomException(ErrorCode.NOT_APPROPRIATE_AUTHORITY);

        if(club.isCategory()!=clubRegistRequest.isCategory()) throw new CustomException(ErrorCode.CANNOT_UPDATE_CATEGORY);

        if(clubRepository.existsByTitleContainingAndClubIdNotLikeAndFlagFalse(clubRegistRequest.getTitle(), clubId)) throw new CustomException(ErrorCode.ALREADY_SAME_TITLE);


        club.setTitle(clubRegistRequest.getTitle());
        club.setGoal(clubRegistRequest.getGoal());
        club.setImage(clubRegistRequest.getImage());

        clubRepository.save(club);

        return makeClubResponse(club);
    }


    //클럽에 속해있는 멤버와 멤버에 대한 정보를 조회
    public List<ClubMemberResponse> getClubMember(int clubId){
        List<ClubMemberResponse> clubMemberResponses = new ArrayList<>();
        Club club = getClub(clubId);
//        List<UserClub> userClubs = getClub(clubId).getUserClubs();
        List<UserClub> userClubs = userClubRepository.findByClubAndFlagFalse(club);

        if(userClubs == null) throw new CustomException(ErrorCode.NO_EXIST_USER_CLUB);

        for(UserClub userClub : userClubs){
            User user = userClub.getUser();

            Period period = Period.between(userClub.getCreatedAt().toLocalDate(), LocalDate.now());
            int completionPercent = (int) (userClub.getAchieveCount() * 100 /(period.getDays()+1));
            clubMemberResponses.add(
                    ClubMemberResponse.builder()
                            .userId(user.getUserId())
                            .nickname(user.getNickname())
                            .completionPercent(completionPercent)
                            .completionToday(userClub.isAchieveToday())
                            .image(user.getImage())
                    .build()
            );
        }

        return clubMemberResponses;
    }

    // 클럽의 기본 정보 조회
    public ClubResponse getClubInfo(int clubId){
        Club club = getClub(clubId);
        return makeClubResponse(club);
    }

    // 사용자가 속한 클럽 조회
    public List<ClubResponse> getClubsContainMember(int userId){
        User user = getUser(userId);
        List<UserClub> userClubs  = userClubRepository.findAllByUserAndFlagFalse(user);

        if(userClubs == null) throw new CustomException(ErrorCode.NO_EXIST_CLUB);

        List<ClubResponse> clubResponses = new ArrayList<>();

        for(UserClub userClub:userClubs){
            Club club = userClub.getClub();

            clubResponses.add(
                    makeClubResponse(club)
            );
        }

        return clubResponses;
    }
        
    // 클럽, 년도, 월이 주어졌을 때 그 달의 일별 성취율 조회
    public ClubCalendarResponse getCalendar(int clubId, int year, int month){
        Club club = getClub(clubId);

        Period period = Period.between(club.getCreatedAt().toLocalDate(), LocalDate.now());

        List<CalendarResponse> calendarResponses = new ArrayList<>();
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        while(!startDate.isAfter(endDate)){
            Calendar calendar = calendarRepository.findCalendarByDateAndClubAndFlagFalse(startDate, club);

            if(calendar!=null){
                calendarResponses.add(CalendarResponse.builder()
                        .date(startDate)
                        .achievePercent(calendar.getAchieveCount() * 100 / calendar.getMemberCount())
                        .build());
            }
            else{
                calendarResponses.add(CalendarResponse.builder()
                        .date(startDate)
                        .achievePercent(0)
                        .build());
            }

            startDate = startDate.plusDays(1);
        }



        return ClubCalendarResponse.builder()
                .exp(club.getExp())
                .successDays(club.getSuccessDays())
                .completionPercent(club.getSuccessDays() * 100 /(period.getDays()+1))
                .calendarResponses(calendarResponses)
                .build();
    }


    //클럽 객체를 클럽 응답 객체로 반환
    @Transactional
    public ClubResponse makeClubResponse(Club club){
        return ClubResponse.builder()
                .clubId(club.getClubId())
                .category(club.isCategory())
                .exp(club.getExp())
                .goal(club.getGoal())
                .image(club.getImage())
                .title(club.getTitle())
                .level(club.getLevel())
                .successDays(club.getSuccessDays())
                .memberCnt(calendarRepository.findCalendarByDateAndClubAndFlagFalse(LocalDate.now(), club).getMemberCount())
                .build();
    }


    //클럽의 레벨을 오전 12시마다 변경 + calendar 한줄 추가
    public void updateClubAndCalendar(){
        List<Club> clubs = clubRepository.findAll();

        LocalDate yesterday = LocalDate.now().minusDays(1);
        LocalDate today = LocalDate.now();

        for(Club club : clubs){
            Calendar calendar = calendarRepository.findCalendarByDateAndClubAndFlagFalse(yesterday, club);

            if(calendar==null) continue;

            int exp = club.getExp();
            if(calendar.getAchieveCount() == calendar.getMemberCount()){
                exp += 10;

                if(exp > 100){
                    club.setLevel(club.getLevel()+1);
                    exp -= 100;
                }

                club.setExp(exp);
                clubRepository.save(club);
            }

            calendarRepository.save(Calendar.builder()
                            .date(today)
                            .achieveCount(0)
                            .club(club)
                            .memberCount(calendar.getMemberCount())
                            .build());
        }
    }

    public List<ClubResponse> getClubRecommendation(int userId, int sorting){
        //타겟이 비슷한 사람들이 많은 클럽 10개 추출
        //추후 변경 예정!!!!!
        List<ClubResponse> clubResponses = new ArrayList<>();
        List<Club> clubs = clubRepository.findAll();
        for(Club club : clubs){
            ClubResponse response = ClubResponse.builder()
                    .clubId(club.getClubId())
                    .level(club.getLevel())
                    .title(club.getTitle())
                    .successDays(club.getSuccessDays())
                    .category(club.isCategory())
                    .exp(club.getExp())
                    .goal(club.getGoal())
                    .image(club.getImage())
                    .memberCnt(club.getCalendar().get(club.getCalendar().size()-1).getMemberCount())
                    .build();
            clubResponses.add(response);
        }

        //sorting에 따라 이 클럽들 정렬
        //sorting 0 = 클럽 참여자 순, 1 = 클럽 달성률 순, 2 = 클럽 레벨 순
        return clubResponses;
    }
}
