package com.ssafy.muscle_maker.service;

import com.ssafy.muscle_maker.dto.follow.response.FollowListResponse;
import com.ssafy.muscle_maker.dto.follow.FollowUserDto;
import com.ssafy.muscle_maker.entity.Follow;
import com.ssafy.muscle_maker.entity.NotificationType;
import com.ssafy.muscle_maker.entity.User;
import com.ssafy.muscle_maker.exception.CustomException;
import com.ssafy.muscle_maker.exception.ErrorCode;
import com.ssafy.muscle_maker.repository.FollowRepository;
import com.ssafy.muscle_maker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public User getUser(int userId) {return userRepository.findByUserIdAndFlagFalse(userId).orElseThrow(()-> new CustomException(ErrorCode.NO_EXIST_USER));}

    //userId의 사용자의 팔로워 팔로잉 리스트 조회
    public FollowListResponse getFollows(int userId, int sortType){
        User user = getUser(userId);

        return FollowListResponse.builder()
                .followerList(getFollowers(user, sortType))
                .followingList(getFollowings(user, sortType))
                .build();
    }



    //userId의 사용자의 팔로워 리스트 조회
    public List<FollowUserDto> getFollowers(User user, int sortType){
        List<Follow> follows;
        if(sortType == 0)
            follows = followRepository.findByFollowerAndFlagFalse(user);
        else if(sortType == 1)
            follows = followRepository.findByFollowerAndFlagFalseOrderByCreatedAtAsc(user);
        else if(sortType == 2)
            follows = followRepository.findByFollowerAndFlagFalseOrderByCreatedAtDesc(user);
        else if(sortType == 3)
            follows = followRepository.findByFollowerAndFlagFalseOrderByFollower_NicknameDesc(user);
        else if(sortType == 4)
            follows = followRepository.findByFollowerAndFlagFalseOrderByFollower_NicknameAsc(user);
        else throw new CustomException(ErrorCode.NO_EXIST);

        List<FollowUserDto> followers = new ArrayList<>();

        for(Follow follow : follows){
            followers.add(
                    FollowUserDto.builder()
                            .userId(follow.getFollower().getUserId())
                            .nickname(follow.getFollower().getNickname())
                            .build()
            );
        }

        return followers;
    }

    //userId의 사용자의 팔로잉 리스트 조회
    public List<FollowUserDto> getFollowings(User user, int sortType){
        List<Follow> follows;

        if(sortType == 0)
            follows = followRepository.findByFollowingAndFlagFalse(user);
        else if(sortType == 1)
            follows = followRepository.findByFollowingAndFlagFalseOrderByCreatedAtAsc(user);
        else if(sortType == 2)
            follows = followRepository.findByFollowingAndFlagFalseOrderByCreatedAtDesc(user);
        else if(sortType == 3)
            follows = followRepository.findByFollowingAndFlagFalseOrderByFollower_NicknameDesc(user);
        else if(sortType == 4)
            follows = followRepository.findByFollowingAndFlagFalseOrderByFollower_NicknameAsc(user);
        else throw new CustomException(ErrorCode.NO_EXIST);

        List<FollowUserDto> followings = new ArrayList<>();


        for(Follow follow : follows){
            followings.add(
                    FollowUserDto.builder()
                            .userId(follow.getFollowing().getUserId())
                            .nickname(follow.getFollowing().getNickname())
                            .build()
            );
        }

        return followings;
    }

    // 팔로우 요청
    public void applyFollow(int followerId, int followingId){
        User follower = getUser(followerId);
        User following = getUser(followingId);

        if(followRepository.existsByFollowerAndFollowingAndFlagFalse(follower, following)) throw new CustomException(ErrorCode.ALREADY_FOLLOW);
        else notificationService.sendNotification(followingId, followerId, NotificationType.FOLLOW, follower.getName() + "님이 팔로우하였습니다.");

        Follow follow = Follow.builder()
                .follower(follower)
                .following(following)
                .build();

        followRepository.save(follow);
    }

    //팔로우 취소
    public void cancelFollow(int followerId, int followingId){
        User follower = getUser(followerId);
        User following = getUser(followingId);

        Follow follow = followRepository.findByFollowerAndFollowingAndFlagFalse(follower, following);

        if(follow == null){
            throw new RuntimeException("팔로잉하고 있지 않습니다.");
        }
        else notificationService.sendNotification(followingId, followerId, NotificationType.FOLLOW, follower.getName() + "님이 팔로우 취소하였습니다.");

        follow.setFlag(true);
        followRepository.save(follow);
    }
}
