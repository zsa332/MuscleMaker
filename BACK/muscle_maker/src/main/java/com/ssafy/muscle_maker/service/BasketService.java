package com.ssafy.muscle_maker.service;

import com.ssafy.muscle_maker.dto.exercise.request.CreateExerciseRequest;
import com.ssafy.muscle_maker.dto.exercise.response.ExerciseResponse;
import com.ssafy.muscle_maker.entity.*;
import com.ssafy.muscle_maker.exception.CustomException;
import com.ssafy.muscle_maker.exception.ErrorCode;
import com.ssafy.muscle_maker.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BasketService {

    private final BasketRepository basketRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;
    private final MyRoutineRepository myRoutineRepository;
    private final RoutineRepository routineRepository;

    public void exerciseRoutineToBasket(int userId, int exerciseId){
        User user = userRepository.findById(userId).orElseThrow(()-> new CustomException(ErrorCode.NO_EXIST));
        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow(()-> new CustomException(ErrorCode.NO_EXIST));
        Basket basket = basketRepository.findByUserAndFlagFalse(user);

        Exercise copyExercise = Exercise.builder()
                .name(exercise.getName())
                .number(exercise.getNumber())
                .setTime(exercise.getSetTime())
                .type(exercise.isType())
                .weight(exercise.getWeight())
                .basket(basket)
                .build();

        exerciseRepository.save(copyExercise);
    }

    //my routine, routine 둘 다 들어가야함
    public void exerciseBasketToRoutine(int exerciseId, int myRoutineId){
        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST));
        MyRoutine myRoutine = myRoutineRepository.findById(myRoutineId).orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST));
        int whichDay = myRoutine.getWhichDay();
        User user = myRoutine.getUser();
        LocalDate date = LocalDate.now();
        int day = date.getDayOfWeek().getValue();
        date = date.plusDays(whichDay - day);
        Routine routine = routineRepository.findByUserAndDateAndFlagFalse(user, date);

        exercise.setBasketFalse();
        exercise.setMyRoutine(myRoutine);
        exercise.setRoutine(routine);

        exerciseRepository.save(exercise);
    }

    public List<ExerciseResponse> removeExerciseAtBasket(int exerciseId){
        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST));
        exercise.setFlag(true);
        exerciseRepository.save(exercise);
        Basket basket = exercise.getBasket();

        List<ExerciseResponse> responses = new ArrayList<>();
        List<Exercise> exercises = exerciseRepository.findByBasketAndFlagFalse(basket);
        for(Exercise e : exercises){
            ExerciseResponse response = ExerciseResponse.builder()
                    .number(e.getNumber())
                    .exerciseId(e.getExerciseId())
                    .setTime(e.getSetTime())
                    .weight(e.getWeight())
                    .name(e.getName())
                    .success(e.isSuccess())
                    .build();
            responses.add(response);
        }

        return responses;
    }

    public List<ExerciseResponse> findExercise(int userId){
        List<ExerciseResponse> responses = new ArrayList<>();
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST));
        Basket basket = basketRepository.findByUserAndFlagFalse(user);
        List<Exercise> exercises = exerciseRepository.findByBasketAndFlagFalse(basket);

        for(Exercise exercise : exercises){
            ExerciseResponse response = ExerciseResponse.builder()
                    .exerciseId(exercise.getExerciseId())
                    .success(exercise.isSuccess())
                    .name(exercise.getName())
                    .weight(exercise.getWeight())
                    .setTime(exercise.getSetTime())
                    .number(exercise.getNumber())
                    .build();
            responses.add(response);
        }

        return responses;
    }


    public void createBasketWhenSignUp(int userId){
        User user = userRepository.findById(userId).orElseThrow();
        Basket basket = Basket.builder()
                .user(user)
                .build();
        basketRepository.save(basket);
    }


}
