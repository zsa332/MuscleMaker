package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.MyRoutine;
import com.ssafy.muscle_maker.entity.Routine;
import com.ssafy.muscle_maker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MyRoutineRepository extends JpaRepository<MyRoutine, Integer>{
    MyRoutine findByUserAndWhichDayAndFlagFalse(User user, int day);
    List<MyRoutine> findAllByFlagFalse();
    List<MyRoutine> findByUserAndFlagFalse(User user);

}
