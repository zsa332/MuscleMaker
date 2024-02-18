package com.ssafy.muscle_maker.controller;

import com.ssafy.muscle_maker.controller.constants.Message;
import com.ssafy.muscle_maker.dto.follow.request.FollowRequest;
import com.ssafy.muscle_maker.service.FollowService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/follows")
public class FollowController {
    private final FollowService followService;


    //팔로우 요청
    @PostMapping
    public ResponseEntity<Message> applyFollow(@RequestBody FollowRequest followRequest){
        followService.applyFollow(followRequest.getFollowerId(), followRequest.getFollowingId());
        return new ResponseEntity<>(new Message("팔로잉 요청에 성공했습니다."), HttpStatus.OK);
    }

    //팔로우 취소
    @DeleteMapping
    public ResponseEntity<Message> cancelFollow(@RequestParam int followerId, @RequestParam int followingId){
        followService.cancelFollow(followerId, followingId);
        return new ResponseEntity<>(new Message("팔로잉 취소에 성공했습니다."), HttpStatus.OK);
    }

    //팔로우 목록 조회
    @GetMapping
    public ResponseEntity<Message> getFollowList(@RequestParam int userId, @RequestParam int sortType){
        return new ResponseEntity<>(new Message("팔로우 목록 조회 성공", followService.getFollows(userId, sortType)), HttpStatus.OK);
    }

    @GetMapping("/recommendations")
    public ResponseEntity<Message> getFollowRecommendation(@RequestParam int userId){
        Message message = new Message("추천 팔로우 조회 성공!");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
