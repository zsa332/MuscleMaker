package com.ssafy.muscle_maker.controller;

import com.ssafy.muscle_maker.controller.constants.Message;
import com.ssafy.muscle_maker.dto.feeds.comment.CommentDto;
import com.ssafy.muscle_maker.dto.feeds.request.FeedDto;
import com.ssafy.muscle_maker.service.CommentService;
import com.ssafy.muscle_maker.service.FeedService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/feeds")
public class FeedController {

    private final FeedService feedService;
    private final CommentService commentService;

    @GetMapping("/recommend/{userId}") // 추천 피드
    public ResponseEntity<Message> getAllFeed(@PathVariable int userId){
        Map<String, Object> map = new HashMap<>();
        map.put("feeds" , feedService.getAllFeedList(1, userId));
        return ResponseEntity.status(HttpStatus.OK).body(new Message("성공적으로 피드를 조회하였습니다.", map));
    }

    @GetMapping("/{userId}") // 내 피드 조회
    public ResponseEntity<Message> getMyFeed(@PathVariable int userId){
        Map<String, Object> map = new HashMap<>();
        map.put("feeds" , feedService.getMyFeed(userId));
        return ResponseEntity.status(HttpStatus.OK).body(new Message("성공적으로 피드를 조회하였습니다.", map));
    }

    @GetMapping("/{userId}/{individualId}") // 개인 피드 조회
    public ResponseEntity<Message> getMyFeed(@PathVariable int userId, @PathVariable int individualId){
        Map<String, Object> map = new HashMap<>();
        map.put("feeds" , feedService.getIndividualFeed(userId, individualId));
        return ResponseEntity.status(HttpStatus.OK).body(new Message("성공적으로 피드를 조회하였습니다.", map));
    }

    @GetMapping("/follow/{userId}") // 팔로우  피드 조회
    public ResponseEntity<Message> getFollowFeed(@PathVariable int userId){
        Map<String, Object> map = new HashMap<>();
        map.put("feeds", feedService.getFollowFeed(userId));
        return ResponseEntity.status(HttpStatus.OK).body(new Message("성공적으로 팔로우 피드를 조회하였습니다.", map));
    }

    @GetMapping("/exercise/{userId}") //운동클럽  피드 조회
    public ResponseEntity<Message> getExerciseFeed(@PathVariable int userId){
        Map<String, Object> map = new HashMap<>();
        map.put("feeds", feedService.getClubExerciseFeed(userId));
        return ResponseEntity.status(HttpStatus.OK).body(new Message("성공적으로 팔로우 피드를 조회하였습니다.", map));
    }

    @GetMapping("/food/{userId}") //푸드클럽 피드 조회
    public ResponseEntity<Message> getFoodFeed(@PathVariable int userId){
        Map<String, Object> map = new HashMap<>();
        map.put("feeds", feedService.getClubFoodFeed(userId));
        return ResponseEntity.status(HttpStatus.OK).body(new Message("성공적으로 팔로우 피드를 조회하였습니다.", map));
    }

    @GetMapping("/search") // 피드 검색
    public ResponseEntity<Message> searchFeed(@RequestParam String keyword){
        Map<String, Object> map = new HashMap<>();
        map.put("feeds" ,feedService.searchFeed(keyword));
        return ResponseEntity.status(HttpStatus.OK).body(new Message("성공적으로 피드 검색을 하였습니다.", map));
    }

    @PostMapping("/write") // 피드 등록
    public ResponseEntity<Message> writeFeed(@RequestPart(value = "feedDto") FeedDto feedDto, @RequestPart(value = "img", required = false) MultipartFile img) throws IOException {
        FeedDto feedDTO =feedService.writeFeed(feedDto,img);
        Message message = new Message("등록성공", feedDTO);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }

    @PostMapping("/delete") // 피드 삭제
    public ResponseEntity<Message> deleteFeed(@RequestBody FeedDto feedDto)  {
        feedService.deleteFeed(feedDto);
        Message message = new Message("글 삭제 성공 ");
        return new ResponseEntity<>(message,HttpStatus.OK);
    }


    /*
    --------------------------------------comment, feed boundary--------------------------------------------------------
     */
    @GetMapping("/comments/{feedId}") // 피드 댓글 조회
    public ResponseEntity<?> getComments(@PathVariable int feedId){
        Map<String, Object> map = new HashMap<>();
        map.put("comments", commentService.getComments(feedId));
        return ResponseEntity.status(HttpStatus.OK).body(new Message("성공적으로 댓글을 조회하였습니다.", map));
    }

    @PostMapping("/comments") // 피드 댓글 등록
    public ResponseEntity<?> registComment(@RequestBody CommentDto commentDto){
        Map<String, Object> map = new HashMap<>();
        map.put("comment", commentService.registComment(commentDto));
        return ResponseEntity.status(HttpStatus.OK).body(new Message("성공적으로 댓글을 등록하였습니다.", map));
    }

    @PutMapping("/comments") // 피드 댓글 수정
    public ResponseEntity<?> updateComment(@RequestBody CommentDto commentDto){
        Map<String, Object> map = new HashMap<>();
        map.put("comment", commentService.updateComment(commentDto));
        return ResponseEntity.status(HttpStatus.OK).body(new Message("성공적으로 댓글을 수정하였습니다.", map));
    }

    @DeleteMapping("/comments/{commentId}") // 피드 댓글 삭제
    public ResponseEntity<?> deleteComment(@PathVariable int commentId){
        commentService.deleteComment(commentId);
        return ResponseEntity.status(HttpStatus.OK).body(new Message("성공적으로 댓글을 삭제하였습니다."));
    }

    @GetMapping("/favorites/{userId}/{feedId}") // 피드 좋아요 추가 / 취소
    public ResponseEntity<?> toggleFavorite(@PathVariable int userId, @PathVariable int feedId){
        String msg = feedService.toggleFavorite(userId, feedId);
        return ResponseEntity.status(HttpStatus.OK).body(new Message(msg));
    }

    @GetMapping("/favorites/{userId}") // 좋아요한 피드 목록
    public ResponseEntity<?> getFavorites(@PathVariable int userId){
        List<FeedDto> feedDtoList = feedService.getFavoriteFeedsByUser(userId);
        Map<String, Object> map = new HashMap<>();
        map.put("feeds", feedDtoList);
        return ResponseEntity.status(HttpStatus.OK).body(new Message("성공적으로 좋아요 목록을 조회하였습니다.", map));
    }

}
