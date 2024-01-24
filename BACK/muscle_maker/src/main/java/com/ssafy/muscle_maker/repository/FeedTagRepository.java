package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.FeedTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedTagRepository extends JpaRepository<FeedTag,Long> {

}
