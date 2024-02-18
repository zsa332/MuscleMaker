package com.ssafy.muscle_maker.controller;

import com.ssafy.muscle_maker.controller.constants.Message;
import com.ssafy.muscle_maker.dto.individualGoals.request.IndividualGoalUpdateRequest;
import com.ssafy.muscle_maker.dto.individualGoals.request.IndividualGoalWriteRequest;
import com.ssafy.muscle_maker.dto.individualGoals.response.IndividualGoalResponse;
import com.ssafy.muscle_maker.entity.IndividualGoal;
import com.ssafy.muscle_maker.service.IndividualGoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/individual-goal")
public class IndividualGoalController {

    private final IndividualGoalService individualGoalService;

    @Autowired
    public IndividualGoalController(IndividualGoalService individualGoalService){
        this.individualGoalService = individualGoalService;
    }

    @GetMapping()
    public ResponseEntity<Message> getIndividualGoal(@RequestParam("userId") int userId) {
        Message message = new Message("개인 목표 조회 성공", individualGoalService.findUserIndividualGoal(userId));
        return  new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Message>  updateIndividualGoal(@RequestParam("individualGoalId") int individualGoalId, @RequestBody IndividualGoalUpdateRequest individualGoalUpdateRequest) {
        Message message = new Message("개인 목표 업데이트 성공", individualGoalService.updateIndividualGoal(individualGoalId, individualGoalUpdateRequest));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Message> writeIndividualGoal(@RequestParam("userId") int userId, @RequestBody IndividualGoalWriteRequest individualGoalWriteRequest ){
        Message message;
        message = new Message("개인 목표 등록 성공", individualGoalService.writeIndividualGoal(userId, individualGoalWriteRequest));
        return new  ResponseEntity<> (message,HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<Message> deleteIndividualGoal(@RequestHeader("individualGoalId") int individualGoalId){
        individualGoalService.deleteIndividualGoal(individualGoalId);
        Message message = new Message("개인 목표 삭제 완료");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }



}
