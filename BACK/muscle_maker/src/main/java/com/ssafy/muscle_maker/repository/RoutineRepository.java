package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.IndividualGoal;
import com.ssafy.muscle_maker.entity.Routine;
import com.ssafy.muscle_maker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RoutineRepository extends JpaRepository<Routine, Integer>{

    Routine findByUserAndWhichDayAndDateBetweenAndFlagFalse(User user, int day, LocalDate startDate, LocalDate endDate);
//    Routine findByRoutineIdAndDateAndFlagFalse(int routineId, LocalDate date);
    List<Routine> findByUserAndDateBetweenAndFlagFalseOrderByDateAsc(User user, LocalDate startDate, LocalDate endDate);
//    Routine findByDate(LocalDate date);
//    List<Routine> findByUserAndSettingsTrueAndFlagFalse(User user);

//    Routine findByRoutineIdAndFlagFalse(int routineId);

    Routine findByUserAndDateAndFlagFalse(User user, LocalDate date);

}

