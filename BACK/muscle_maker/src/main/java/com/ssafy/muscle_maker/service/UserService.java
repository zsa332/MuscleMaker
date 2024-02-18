package com.ssafy.muscle_maker.service;

import com.ssafy.muscle_maker.awsS3.S3Uploader;
import com.ssafy.muscle_maker.dto.kakao.KakaoUserInfoDto;
import com.ssafy.muscle_maker.dto.users.LoginDto;
import com.ssafy.muscle_maker.dto.users.UserDto;
import com.ssafy.muscle_maker.dto.users.request.ModifyPasswordRequest;
import com.ssafy.muscle_maker.dto.users.request.UserInfoRequest;
import com.ssafy.muscle_maker.dto.users.response.UserInfoResponse;
import com.ssafy.muscle_maker.entity.Authority;
import com.ssafy.muscle_maker.entity.User;
import com.ssafy.muscle_maker.exception.CustomException;
import com.ssafy.muscle_maker.exception.ErrorCode;
import com.ssafy.muscle_maker.repository.UserRepository;
import com.ssafy.muscle_maker.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final S3Uploader s3Uploader;
    private final RoutineService routineService;
    @Transactional
    public User getUser(int userId){ return userRepository.findByUserIdAndFlagFalse(userId).orElseThrow(()-> new CustomException(ErrorCode.NO_EXIST_USER));}

    public List<UserDto> searchUser(String keyword){
        keyword = keyword.trim();
        System.out.println(keyword);
        List<User> users = userRepository.findByNicknameContaining(keyword).orElseThrow(()->new CustomException(ErrorCode.NO_EXIST_USER));
        System.out.println(users.size());
        List<UserDto> userDtoList = new ArrayList<>();
        for(User user : users) userDtoList.add(UserDto.builder().build().from(user));
        return userDtoList;
    }

    @Transactional
    public UserDto signup(UserDto userDto) {
        if (userRepository.findOneWithAuthoritiesByEmailId(userDto.getEmailId()).orElse(null) != null) {
            throw new CustomException(ErrorCode.DUPLICATE_EMAIL_ID);
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        User user = User.builder()
                .emailId(userDto.getEmailId())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
                .address(userDto.getAddress())
                .age(userDto.getAge())
                .name(userDto.getName())
                .gender(userDto.isGender())
                .height(userDto.getHeight())
                .weight(userDto.getWeight())
                .image(userDto.getImage())
                .authorities(Collections.singleton(authority))
                .exerciseClub(false)
                .foodClub(false)
                .activated(true)
                .build();

        return UserDto.from(userRepository.save(user));
    }
      public int getUserId(String emailId){
        User user = userRepository.findByEmailIdAndFlagFalse(emailId).orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST_USER));
        return user.getUserId();
    }


    public UserInfoResponse getCurrentUserInfo(){
        User user = userRepository.findByEmailIdAndFlagFalse(
                SecurityUtil.getCurrentUsername().orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST_USER))
        ).orElseThrow(()-> new CustomException(ErrorCode.NO_EXIST_USER));

        return makeUserInfoResponse(user);
    }

    public UserInfoResponse updateUserInfo(UserInfoRequest userInfoRequest, MultipartFile img) throws IOException {
        String imgName = s3Uploader.upload(img,"user-images");
        userInfoRequest.setImage(imgName);
        User user = userRepository.findByEmailIdAndFlagFalse(
                SecurityUtil.getCurrentUsername().orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST_USER))
        ).orElseThrow(()-> new CustomException(ErrorCode.NO_EXIST_USER));

        user.setName(userInfoRequest.getName());
        user.setNickname(userInfoRequest.getNickname());
        user.setImage(userInfoRequest.getImage());
        user.setHeight(userInfoRequest.getHeight());
        user.setWeight(userInfoRequest.getWeight());
        user.setAddress(userInfoRequest.getAddress());
        user.setAge(userInfoRequest.getAge());

        userRepository.save(user);

        return makeUserInfoResponse(user);
    }

    public void updatePassword(ModifyPasswordRequest modifyPasswordRequest){
        User user = userRepository.findByEmailIdAndFlagFalse(
                SecurityUtil.getCurrentUsername().orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST_USER))
        ).orElseThrow(()-> new CustomException(ErrorCode.NO_EXIST_USER));

        //기존 비밀번호를 맞추면
        if(passwordEncoder.matches(modifyPasswordRequest.getOldPassword(), user.getPassword())){
            user.setPassword(passwordEncoder.encode(modifyPasswordRequest.getNewPassword()));
        }
        else{
            throw new CustomException(ErrorCode.NOT_MATCH_PASSWORD);
        }

        userRepository.save(user);
    }


    public boolean isAlreadyRegistered(KakaoUserInfoDto kakaoUserInfoDto){
        return userRepository.existsByEmailIdAndFlagFalse(kakaoUserInfoDto.getEmailId());
    }


    public UserInfoResponse makeUserInfoResponse(User user){
        return UserInfoResponse.builder()
                .nickname(user.getNickname())
                .name(user.getName())
                .image(user.getImage())
                .address(user.getAddress())
                .weight(user.getWeight())
                .height(user.getHeight())
                .gender(user.isGender())
                .emailId(user.getEmailId())
                .age(user.getAge())
                .build();
    }

    public LoginDto getUserInfoByEmail(String emailId){
        User user =  userRepository.findByEmailIdAndFlagFalse(emailId).orElseThrow(
                () -> new CustomException(ErrorCode.NO_EXIST_USER)
        );

        return new LoginDto(user.getEmailId(), user.getPassword());
    }


}
