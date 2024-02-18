package com.ssafy.muscle_maker.service;

import com.ssafy.muscle_maker.dto.clubs.request.ClubLeaderRequest;
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

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserClubService {
    private final UserClubRepository userClubRepository;
    private final UserRepository userRepository;
    private final ClubRepository clubRepository;
    private final CalendarRepository calendarRepository;

    @Transactional
    public User getUser(int userId){ return userRepository.findByUserIdAndFlagFalse(userId).orElseThrow(()-> new CustomException(ErrorCode.NO_EXIST_USER));}

    @Transactional
    public Club getClub(int clubId){ return clubRepository.findClubByClubIdAndFlagFalse(clubId).orElseThrow(()-> new CustomException(ErrorCode.NO_EXIST_CLUB));}


    @Transactional
    public UserClub getUserClub(User user, Club club){ return userClubRepository.findByUserAndClubAndFlagFalse(user, club).orElseThrow(()-> new CustomException(ErrorCode.NO_EXIST_USER_CLUB));}

    // userId의 사용자가 clubId의 클럽에 가입 신청
    public void applyClub(int userId, int clubId){
        User user = getUser(userId);
        Club club = getClub(clubId);
        UserClub userClub = userClubRepository.findByUserAndClubAndFlagFalse(user, club).orElse(null);
        if(userClub!=null) throw new CustomException(ErrorCode.ALREADY_IN_CLUB);

        if(!club.isCategory() && user.isExerciseClub()) throw new CustomException(ErrorCode.ALREADY_IN_EXERCISE_CLUB);

        if(club.isCategory() && user.isFoodClub()) throw new CustomException(ErrorCode.ALREADY_IN_FOOD_CLUB);

        //유저-클럽 테이블에 신청 권한 2와 함께 열 추가
        userClubRepository.save(UserClub.builder()
                .user(user)
                .club(club)
                .authority(2)
                .build());
    }
    
    
    //userId의 사용자가 clubId의 클럽을 탈퇴
    public void leaveClub(int userId, int clubId){
        User user = getUser(userId);
        Club club = getClub(clubId);
        UserClub userClub = getUserClub(user, club);

        if(userClub==null || userClub.getAuthority()==2) throw new CustomException(ErrorCode.NO_EXIST_USER_CLUB);

        updateUser(user, club.isCategory(), false);

        userClub.setFlag(true);
        userClubRepository.save(userClub);

        //탈퇴시 calendar의 오늘의 날짜에 해당하는 정보 업뎃
        Calendar calendar = calendarRepository.findCalendarByDateAndClubAndFlagFalse(LocalDate.now(), club);
        if(userClub.isAchieveToday()) calendar.setAchieveCount(calendar.getAchieveCount()-1);
        calendar.setMemberCount(calendar.getMemberCount()-1);
        calendarRepository.save(calendar);


        if(userClub.getAuthority()==0){
            Calendar nowCalendar = calendarRepository.findCalendarByDateAndClubAndFlagFalse(LocalDate.now(), club);
            //클럽 장 혼자 남았을 때 클럽 삭제
            if(nowCalendar.getMemberCount() == 0){
                club.setFlag(true);
            }
            //클럽 장이 나가고 싶을 때 user_club table의 achieve_count 제일 큰 사람한테 클럽 장 넘김
            else{
                UserClub nextLeader = userClubRepository.findFirstByClubAndFlagFalseOrderByAchieveCount(club);
                nextLeader.setAuthority(0);
            }
        }

    }
    
    // clubId의 방장인 leaderId의 사용자가 가입 신청한 memberId의 사용자의 가입 허용
    public void acceptClubMember(ClubLeaderRequest clubLeaderRequest, int clubId){
        User leader = getUser(clubLeaderRequest.getLeaderId());
        Club club = getClub(clubId);
        User member = getUser(clubLeaderRequest.getMemberId());


        if(getUserClub(leader, club).getAuthority()!=0) throw new CustomException(ErrorCode.NOT_APPROPRIATE_AUTHORITY);


        UserClub userClub = getUserClub(member, club);
        if(userClub.getAuthority()!=2)  throw new CustomException(ErrorCode.NOT_APPROPRIATE_AUTHORITY);


        updateUser(member, club.isCategory(), true);

        userClub.setAuthority(1);
        userClubRepository.save(userClub);

        Calendar calendar = calendarRepository.findCalendarByDateAndClubAndFlagFalse(LocalDate.now(), club);
        calendar.setMemberCount(calendar.getMemberCount()+1);
        calendarRepository.save(calendar);
    }
    
    // clubId의 방장인 leaderId의 사용자가 가입 신청한 memberId의 사용자의 가입 거절
    public void refuseClubMember(int leaderId, int memberId, int clubId){
        User leader = getUser(leaderId);
        Club club = getClub(clubId);
        User member = getUser(memberId);

        if(getUserClub(leader, club).getAuthority()!=0)  throw new CustomException(ErrorCode.NOT_APPROPRIATE_AUTHORITY);

        UserClub userClub = getUserClub(member, club);
        userClub.setFlag(true);
        userClubRepository.save(userClub);
    }

    // clubId의 방장인 leaderId의 사용자가 가입 신청한 memberId의 사용자를 탈퇴시킴
    public void fireClubMember(int leaderId, int memberId, int clubId){
        User leader = getUser(leaderId);
        Club club = getClub(clubId);
        User member = getUser(memberId);

        if(getUserClub(leader, club).getAuthority()!=0)  throw new CustomException(ErrorCode.NOT_APPROPRIATE_AUTHORITY);

        updateUser(member, club.isCategory(), false);

        UserClub userClub =getUserClub(member, club);
        userClub.setFlag(true);
        userClubRepository.save(userClub);

        //탈퇴시 calendar의 오늘의 날짜에 해당하는 정보 업뎃
        Calendar calendar = calendarRepository.findCalendarByDateAndClubAndFlagFalse(LocalDate.now(), club);
        if(userClub.isAchieveToday()) calendar.setAchieveCount(calendar.getAchieveCount()-1);
        calendar.setMemberCount(calendar.getMemberCount()-1);
        calendarRepository.save(calendar);
    }

    //clubId의 클럽에 가입되어 있는 userId의 사용자가 오늘의 목표 달성
    public void achieveTarget(int userId, int clubId){
        User user = getUser(userId);
        Club club = getClub(clubId);
        UserClub userClub = getUserClub(user, club);

        if(userClub.getAuthority()==2) throw new CustomException(ErrorCode.NOT_APPROPRIATE_AUTHORITY);

        if(userClub.isAchieveToday()) throw new CustomException(ErrorCode.ALREADY_ACHIEVE_TARGET);

        //개개인의 목표 성취 업뎃
        userClub.setAchieveToday(true);
        userClub.setAchieveCount(userClub.getAchieveCount()+1);
        userClubRepository.save(userClub);

        //클럽의 그날의 목표 성취 업뎃
        Calendar calendar = calendarRepository.findCalendarByDateAndClubAndFlagFalse(LocalDate.now(), club);
        calendar.setAchieveCount(calendar.getAchieveCount()+1);
        calendarRepository.save(calendar);
    }

    public void updateUser(User user, boolean category, boolean flag){
        if(category) user.setFoodClub(flag);
        else user.setExerciseClub(flag);

        userRepository.save(user);
    }


}
