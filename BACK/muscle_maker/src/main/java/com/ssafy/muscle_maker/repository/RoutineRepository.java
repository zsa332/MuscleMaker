package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.IndividualGoal;
import com.ssafy.muscle_maker.entity.Routine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RoutineRepository extends JpaRepository<Routine, Long>{
    Routine findByRoutineIdAndDate(Long routineId, LocalDate date);
    Routine findByDate(LocalDate date);
}
