package com.ssafy.muscle_maker.controller;

import com.ssafy.muscle_maker.controller.constants.Message;
import com.ssafy.muscle_maker.service.BasketService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/basket")
public class BasketController {

    private BasketService basketService;

    @PostMapping
    public ResponseEntity<Message> moveExerciseBasketToRoutine(@RequestParam("myRoutineId") int myRoutineId, @RequestParam("exerciseId") int exerciseId){
        basketService.exerciseBasketToRoutine(exerciseId,myRoutineId);
        Message message = new Message("운동 장바구니에서 루틴 이동 완료");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Message> removeExerciseAtBasket(@RequestHeader("exerciseId") int exerciseId){
        Message message = new Message("운동 장바구니에서 삭제 완료", basketService.removeExerciseAtBasket(exerciseId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Message> readBasket(@RequestParam("userId") int userId){
        Message message = new Message("운동 장바구니에 조회 성공", basketService.findExercise(userId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
