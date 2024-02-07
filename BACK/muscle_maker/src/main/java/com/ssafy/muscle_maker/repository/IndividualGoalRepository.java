package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.IndividualGoal;
import com.ssafy.muscle_maker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IndividualGoalRepository extends JpaRepository<IndividualGoal,Integer> {

    List<IndividualGoal> findByUserAndFlagFalse(User user);

}

