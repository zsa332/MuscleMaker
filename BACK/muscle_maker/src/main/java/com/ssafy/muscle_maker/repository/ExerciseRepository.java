package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Basket;
import com.ssafy.muscle_maker.entity.Exercise;
import com.ssafy.muscle_maker.entity.Routine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
    List<Exercise> findByRoutine(Routine routine);
    Exercise findByExerciseIdAndFlagFalseAndBasket(int exerciseId, Basket basket);
    List<Exercise> findByBasketAndFlagFalse(Basket basket);
    List<Exercise> findByRoutineAndFlagFalse(Routine routine);
    Exercise findByName(String name);
}
