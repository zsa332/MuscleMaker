package com.ssafy.muscle_maker.controller;

import com.ssafy.muscle_maker.controller.constants.Message;
import com.ssafy.muscle_maker.dto.inBody.request.*;
import com.ssafy.muscle_maker.service.InBodyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/inbody")
public class InBodyController {

    private final InBodyService inBodyService;

    @PostMapping
    public ResponseEntity<Message> addInBody(@RequestParam("userId") int userId, @RequestBody CreateInBodyRequest request){
        Message message = new Message("인바디 정보 등록 성공", inBodyService.createInBody(userId,request));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Message> findInBodies(@RequestParam("userId") int userId){
        Message message = new Message("인바디 정보 조회 성공", inBodyService.findInBodyList(userId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Message> updateInBody(@RequestParam("inBodyId") int inBodyId, @RequestBody UpdateInBodyRequest request){
        Message message = new Message("인바디 정보 수정 성공", inBodyService.modifyInBody(inBodyId, request));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}

