package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.IndividualGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndividualGoalRepository extends JpaRepository<IndividualGoal,Integer> {


}

