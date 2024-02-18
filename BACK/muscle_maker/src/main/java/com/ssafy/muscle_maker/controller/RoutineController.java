package com.ssafy.muscle_maker.controller;

import com.ssafy.muscle_maker.controller.constants.Message;
import com.ssafy.muscle_maker.dto.exercise.request.CreateExerciseRequest;
import com.ssafy.muscle_maker.dto.routine.request.CreateRoutineSettingRequest;
import com.ssafy.muscle_maker.service.BasketService;
import com.ssafy.muscle_maker.service.ExerciseService;
import com.ssafy.muscle_maker.service.MyRoutineService;
import com.ssafy.muscle_maker.service.RoutineService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat.ISO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/routines")
public class RoutineController {

    private final RoutineService routineService;
    private final ExerciseService exerciseService;
    private final BasketService basketService;
    private final MyRoutineService myRoutineService;

//    //사용할 일 없지만 일단 만들어 둠
//    //이유는 루틴 세팅은 매주 최신화(다음 1주일 루틴을 생성 + 이전 1주일 세팅 루틴을 삭제) 하기 때문에 따로 만들 필요가 없음
//    @PostMapping("/settings")
//    public ResponseEntity<Message> addRoutineSetting(@RequestParam("userId") int userId, @RequestBody CreateRoutineSettingRequest request){
//        routineService.createRoutineSetting(request, userId);
//        Message message = new Message("루틴 세팅 등록 성공");
//        return new ResponseEntity<>(message, HttpStatus.OK);
//    }

    @GetMapping("/my-routines")
    public ResponseEntity<Message> findMyRoutine(@RequestParam("userId") int userId){
        Message message = new Message("내 루틴 조회 성공", myRoutineService.readMyRoutine(userId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Message> findThisWeekRoutine(@RequestParam("userId") int userId){
        Message message = new Message("이번주 루틴 조회 성공", routineService.readThisWeekRoutine(userId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("/exercises")
    public ResponseEntity<Message> checkExercise(@RequestParam("exerciseId") int exerciseId){
        Message message = new Message("운동 완료/해제", exerciseService.successExercise(exerciseId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/date")
    public ResponseEntity<Message> findExerciseByDate(@RequestParam("userId") int userId, @RequestParam("date") @DateTimeFormat(iso = ISO.DATE) LocalDate date){
        Message message = new Message("해당 날짜 루틴 조회 성공", routineService.findRoutineByUserIdAndDate(userId, date));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("/settings/exercises")
    public ResponseEntity<Message> modifyExercise(@RequestParam("exerciseId") int exerciseId, @RequestBody CreateExerciseRequest request){
        Message message = new Message("운동 루틴 업테이트 완료", exerciseService.modifyExerciseAtMyRoutineAndRoutine(exerciseId, request));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/settings/exercises")
    public ResponseEntity<Message> deleteExercise(@RequestHeader(value = "exerciseId") int exerciseId){
        exerciseService.deleteExerciseAtMyRoutine(exerciseId);
        Message message = new Message("운동 루틴 삭제 완료");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


    @PostMapping("/settings/exercises")
    public ResponseEntity<Message> createExercise(@RequestParam("userId") int userId, @RequestParam("whichDay") int whichDay, @RequestBody CreateExerciseRequest request){
        Message message = new Message("루틴 운동 생성 완료", exerciseService.createExerciseAtMyRoutineAndRoutine(request, whichDay, userId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/basket")
    public ResponseEntity<Message> createExerciseAtBasket(@RequestParam("userId") int userId, @RequestParam("exerciseId") int exerciseId){
        basketService.exerciseRoutineToBasket(userId, exerciseId);
        Message message = new Message("운동 장바구니 담기 완료");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


}