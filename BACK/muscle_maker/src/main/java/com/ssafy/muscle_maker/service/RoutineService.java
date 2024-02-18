package com.ssafy.muscle_maker.service;

import ch.qos.logback.core.util.CachingDateFormatter;
import com.ssafy.muscle_maker.dto.exercise.response.ExerciseResponse;
import com.ssafy.muscle_maker.dto.routine.request.CreateRoutineRequest;
import com.ssafy.muscle_maker.dto.routine.request.CreateRoutineSettingRequest;
import com.ssafy.muscle_maker.dto.routine.response.FindRoutineResponse;
import com.ssafy.muscle_maker.entity.Exercise;
import com.ssafy.muscle_maker.entity.Routine;
import com.ssafy.muscle_maker.entity.User;
import com.ssafy.muscle_maker.exception.CustomException;
import com.ssafy.muscle_maker.exception.ErrorCode;
import com.ssafy.muscle_maker.repository.ExerciseRepository;
import com.ssafy.muscle_maker.repository.RoutineRepository;
import com.ssafy.muscle_maker.repository.UserRepository;
import com.ssafy.muscle_maker.scheduling.ScheduledTasks;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoutineService {

    private final RoutineRepository routineRepository;
    private final UserRepository userRepository;
    private final ExerciseRepository exerciseRepository;

    @Transactional
    public void saveRoutine(Routine routine) {routineRepository.save(routine);}

    public User findUserById(int userId){
        return userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST));
    }

    //이번주 루틴 조회 세팅 아닌 루틴만 조회
    public List<FindRoutineResponse> readThisWeekRoutine(int userId){
        User user = findUserById(userId);

        LocalDate mondayDate = LocalDate.now();
        while(mondayDate.getDayOfWeek().getValue() != 1){
            mondayDate = mondayDate.plusDays(-1);
        }

        List<FindRoutineResponse> responses = new ArrayList<>();
        List<Routine> routines = routineRepository.findByUserAndDateBetweenAndFlagFalseOrderByDateAsc(user, mondayDate, mondayDate.plusDays(7));

        for(Routine routine : routines) {
            List<ExerciseResponse> exerciseResponses = new ArrayList<>();
            List<Exercise> exercises = exerciseRepository.findByRoutineAndFlagFalse(routine);
            for (Exercise exercise : exercises) {
                ExerciseResponse exerciseResponse = ExerciseResponse.builder()
                        .weight(exercise.getWeight())
                        .exerciseId(exercise.getExerciseId())
                        .setTime(exercise.getSetTime())
                        .success(exercise.isSuccess())
                        .number(exercise.getNumber())
                        .name(exercise.getName())
                        .build();
                exerciseResponses.add(exerciseResponse);
            }

            FindRoutineResponse response = FindRoutineResponse.builder()
                    .exerciseResponseList(exerciseResponses)
                    .title(routine.getTitle())
                    .routineId(routine.getRoutineId())
                    .date(routine.getDate())
                    .whichDay(routine.getWhichDay())
                    .build();
            responses.add(response);

        }

        return responses;
    }

    //루틴 날짜별 조회
    public FindRoutineResponse findRoutineByUserIdAndDate(int userId, LocalDate date){
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST));
        Routine routine = routineRepository.findByUserAndDateAndFlagFalse(user, date);
        List<Exercise> exercises = exerciseRepository.findByRoutineAndFlagFalse(routine);
        List<ExerciseResponse> exerciseResponses = new ArrayList<>();

        for(Exercise exercise : exercises){
            ExerciseResponse exerciseResponse = ExerciseResponse.builder()
                    .exerciseId(exercise.getExerciseId())
                    .name(exercise.getName())
                    .success(exercise.isSuccess())
                    .number(exercise.getNumber())
                    .setTime(exercise.getSetTime())
                    .weight(exercise.getWeight())
                    .build();
            exerciseResponses.add(exerciseResponse);
        }

        FindRoutineResponse response = FindRoutineResponse.builder()
                .title(routine.getTitle())
                .routineId(routine.getRoutineId())
                .exerciseResponseList(exerciseResponses)
                .date(routine.getDate())
                .whichDay(routine.getWhichDay())
                .build();

        return response;
    }


}