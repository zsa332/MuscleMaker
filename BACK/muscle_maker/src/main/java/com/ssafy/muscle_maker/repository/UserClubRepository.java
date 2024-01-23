package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.GoalAchieve;
import com.ssafy.muscle_maker.entity.UserClub;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserClubRepository extends JpaRepository<UserClub, Long> {
    List<GoalAchieve> findAllByUserClubId(Long user_club_id);
}
