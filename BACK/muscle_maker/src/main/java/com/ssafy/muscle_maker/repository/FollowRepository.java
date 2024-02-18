package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Follow;
import com.ssafy.muscle_maker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {
    //해당 사용자가 팔로잉하고 있는 목록 조회
    List<Follow> findByFollowingAndFlagFalse(User follower);
    List<Follow> findByFollowingAndFlagFalseOrderByCreatedAtAsc(User follower);
    List<Follow> findByFollowingAndFlagFalseOrderByCreatedAtDesc(User follower);
    List<Follow> findByFollowingAndFlagFalseOrderByFollower_NicknameAsc(User follower);
    List<Follow> findByFollowingAndFlagFalseOrderByFollower_NicknameDesc(User follower);

    List<Follow> findByFollowerAndFlagFalse(User follower);
    List<Follow> findByFollowerAndFlagFalseOrderByCreatedAtAsc(User follower);
    List<Follow> findByFollowerAndFlagFalseOrderByCreatedAtDesc(User follower);
    List<Follow> findByFollowerAndFlagFalseOrderByFollower_NicknameAsc(User follower);
    List<Follow> findByFollowerAndFlagFalseOrderByFollower_NicknameDesc(User follower);



    //해당 사용자를 팔료잉하고 있는 목록 조회
    List<Follow> findFollowsByFollowingAndFlagFalse(User following);

    Boolean existsByFollowerAndFollowingAndFlagFalse(User follower, User following);
    Follow findByFollowerAndFollowingAndFlagFalse(User follower, User following);

}
