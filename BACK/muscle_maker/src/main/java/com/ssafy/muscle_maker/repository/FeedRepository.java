package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Feed;
import com.ssafy.muscle_maker.entity.Tag;
import com.ssafy.muscle_maker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface FeedRepository extends JpaRepository<Feed, Integer>  {
    Feed findByFeedId(int feedId);

    Optional<List<Feed>> findByVisibilityAndFlagFalse(int visibility);

    List<Feed> findByUserIdAndVisibilityAndFlagFalse(int userId, int visibility);

    Optional<List<Feed>> findByClubIdAndFlagFalse(int clubId);

    Optional<List<Feed>> findByUserIdAndFlagFalse(int userId);
}


