package com.ssafy.muscle_maker.service;

import com.ssafy.muscle_maker.dto.exercise.request.CreateExerciseRequest;
import com.ssafy.muscle_maker.dto.exercise.response.ExerciseResponse;
import com.ssafy.muscle_maker.dto.routine.response.CheckSuccessResponse;
import com.ssafy.muscle_maker.entity.Exercise;
import com.ssafy.muscle_maker.entity.MyRoutine;
import com.ssafy.muscle_maker.entity.Routine;
import com.ssafy.muscle_maker.entity.User;
import com.ssafy.muscle_maker.exception.CustomException;
import com.ssafy.muscle_maker.repository.ExerciseRepository;
import com.ssafy.muscle_maker.repository.MyRoutineRepository;
import com.ssafy.muscle_maker.repository.RoutineRepository;
import com.ssafy.muscle_maker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import static com.ssafy.muscle_maker.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final RoutineRepository routineRepository;
    private final MyRoutineRepository myRoutineRepository;
    private final UserRepository userRepository;

    public void saveExercise(Exercise exercise){exerciseRepository.save(exercise);}
    public User findUserById(int userId){return userRepository.findById(userId).orElseThrow(()->new CustomException(NO_EXIST_USER));}

    public ExerciseResponse createExerciseAtMyRoutineAndRoutine(CreateExerciseRequest request, int whichDay, int userId){
        User user = findUserById(userId);
        MyRoutine myRoutine = myRoutineRepository.findByUserAndWhichDayAndFlagFalse(user, whichDay);
        LocalDate startDate = LocalDate.now();
        while(startDate.getDayOfWeek().getValue() != 1) startDate = startDate.plusDays(-1);
        LocalDate endDate = startDate.plusDays(7);

        Routine routine = routineRepository.findByUserAndWhichDayAndDateBetweenAndFlagFalse(user, whichDay, startDate, endDate);

        Exercise exercise = Exercise.builder()
                .number(request.getNumber())
                .type(request.isType())
                .success(request.isSuccess())
                .weight(request.getWeight())
                .setTime(request.getSetTime())
                .name(request.getName())
                .myRoutine(myRoutine)
                .routine(routine)
                .build();
        exerciseRepository.save(exercise);

        return toExerciseResponse(exercise);
    }

    public void deleteExerciseAtMyRoutine(int exerciseId){
        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow(() -> new CustomException(NO_EXIST));
        exercise.deleteMyRoutine();
        exerciseRepository.save(exercise);
    }


    public CheckSuccessResponse successExercise(int exerciseId){
        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow(() -> new CustomException(NO_EXIST));
        exercise.setSuccess();
        saveExercise(exercise);

        CheckSuccessResponse response = CheckSuccessResponse.builder()
                .success(exercise.isSuccess())
                .exerciseId(exercise.getExerciseId())
                .build();
        return response;
    }

    public ExerciseResponse modifyExerciseAtMyRoutineAndRoutine(int exerciseId, CreateExerciseRequest request){
        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow(() -> new CustomException(NO_EXIST));
        exercise.update(request.getName(), request.getSetTime(), request.getNumber(), request.isType());
        exerciseRepository.save(exercise);
        return toExerciseResponse(exercise);
    }

    public Exercise toExercise(CreateExerciseRequest request){
        Exercise exercise = Exercise.builder()
                .number(request.getNumber())
                .type(request.isType())
                .success(request.isSuccess())
                .weight(request.getWeight())
                .setTime(request.getSetTime())
                .name(request.getName())
                .build();
        return exercise;
    }

    public ExerciseResponse toExerciseResponse(Exercise exercise){
        ExerciseResponse response = ExerciseResponse.builder()
                .name(exercise.getName())
                .exerciseId(exercise.getExerciseId())
                .weight(exercise.getWeight())
                .number(exercise.getNumber())
                .success(exercise.isSuccess())
                .setTime(exercise.getSetTime())
                .build();

        return response;
    }


}
