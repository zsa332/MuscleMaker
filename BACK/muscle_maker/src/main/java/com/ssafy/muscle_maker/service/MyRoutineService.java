package com.ssafy.muscle_maker.service;

import com.ssafy.muscle_maker.dto.exercise.response.ExerciseResponse;
import com.ssafy.muscle_maker.dto.myRoutine.MyRoutineDto;
import com.ssafy.muscle_maker.entity.Exercise;
import com.ssafy.muscle_maker.entity.MyRoutine;
import com.ssafy.muscle_maker.entity.Routine;
import com.ssafy.muscle_maker.entity.User;
import com.ssafy.muscle_maker.exception.CustomException;
import com.ssafy.muscle_maker.exception.ErrorCode;
import com.ssafy.muscle_maker.repository.MyRoutineRepository;
import com.ssafy.muscle_maker.repository.RoutineRepository;
import com.ssafy.muscle_maker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyRoutineService {

    private final MyRoutineRepository myRoutineRepository;
    private final UserRepository userRepository;
    private final RoutineRepository routineRepository;

    //월요일 00시 00분에 이번주 루틴 생성
    //사용자 회원 가입하면 이번주 루틴 생성
    public void makeThisWeekRoutine(){
        LocalDate today = LocalDate.now();
        List<MyRoutine> myRoutines = myRoutineRepository.findAllByFlagFalse();

        for(MyRoutine myRoutine : myRoutines){

            Routine routine = Routine.builder()
                    .title(myRoutine.getTitle())
                    .exercises(myRoutine.getExercises())
                    .user(myRoutine.getUser())
                    .whichDay(myRoutine.getWhichDay())
                    .date(today.plusDays(myRoutine.getWhichDay()-1))
                    .build();

            routineRepository.save(routine);
        }

    }

    public void createBlankRoutineAndMyRoutineWhenSignUp(int userId){
        User user = userRepository.findById(userId).orElseThrow();
        LocalDate monday = LocalDate.now();
        while(monday.getDayOfWeek().getValue() != 1){
            monday = monday.plusDays(-1);
        }

        for(int i=0; i<7; i++){
            Routine routine = Routine.builder()
                    .user(user)
                    .whichDay(monday.plusDays(i).getDayOfWeek().getValue())
                    .date(monday.plusDays(i))
                    .exercises(new ArrayList<>())
                    .build();

            routineRepository.save(routine);

            MyRoutine myRoutine = MyRoutine.builder()
                    .user(user)
                    .whichDay(monday.plusDays(i).getDayOfWeek().getValue())
                    .exercises(new ArrayList<>())
                    .build();

            myRoutineRepository.save(myRoutine);
        }

    }


    public List<MyRoutineDto> readMyRoutine(int userId){
        User user = userRepository.findByUserIdAndFlagFalse(userId).orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST_USER));
        List<MyRoutine> myRoutines = myRoutineRepository.findByUserAndFlagFalse(user);
        List<MyRoutineDto> responses = new ArrayList<>();

        for(MyRoutine myRoutine : myRoutines){
            List<ExerciseResponse> exerciseResponses = new ArrayList<>();
            for(Exercise exercise : myRoutine.getExercises()){
                ExerciseResponse exerciseResponse = ExerciseResponse.builder()
                        .exerciseId(exercise.getExerciseId())
                        .name(exercise.getName())
                        .weight(exercise.getWeight())
                        .setTime(exercise.getSetTime())
                        .success(exercise.isSuccess())
                        .number(exercise.getNumber())
                        .build();
                exerciseResponses.add(exerciseResponse);
            }

            MyRoutineDto myRoutineDto = MyRoutineDto.builder()
                    .myRoutineId(myRoutine.getMyRoutineId())
                    .whichDay(myRoutine.getWhichDay())
                    .title(myRoutine.getTitle())
                    .exerciseResponseList(exerciseResponses)
                    .build();

            responses.add(myRoutineDto);
        }

        return responses;
    }

}
