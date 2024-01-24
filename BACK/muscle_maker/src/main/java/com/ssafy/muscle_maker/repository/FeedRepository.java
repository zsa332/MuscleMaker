package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface FeedRepository extends JpaRepository<Feed,Long>  {
    Feed findByFeedId(Long feedId);
    List<Feed> findByFeedIdIn(List<Long> feedIds);
}


