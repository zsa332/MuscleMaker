package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.IndiviualGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndiviualGoalRepository  extends JpaRepository<IndiviualGoal,Long> {

}
