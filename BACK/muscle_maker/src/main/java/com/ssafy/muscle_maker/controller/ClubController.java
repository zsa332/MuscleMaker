package com.ssafy.muscle_maker.controller;

import com.ssafy.muscle_maker.controller.constants.Message;
import com.ssafy.muscle_maker.dto.clubs.request.ClubRegistRequest;
import com.ssafy.muscle_maker.dto.feeds.request.FeedDto;
import com.ssafy.muscle_maker.service.ClubService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;

@RestController
@AllArgsConstructor
@RequestMapping("/clubs")
public class ClubController {

    private ClubService clubService;

    @GetMapping("/{clubId}")
    public ResponseEntity<Message> getClub(@PathVariable int clubId){
        Message message = new Message("클럽 기본 정보 조회를 성공하였습니다.", clubService.getClubInfo(clubId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Message> searchClub(@RequestParam String keyword){
        Message message = new Message("클럽 기본 정보 조회를 성공하였습니다.",clubService.searchClub(keyword));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/members/{clubId}")
    public ResponseEntity<Message> getMembersInfo(@PathVariable int clubId){
        Message message = new Message("멤버 조회에 성공했습니다.", clubService.getClubMember(clubId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Message> registerClub(@RequestPart(value = "clubRegistRequest") ClubRegistRequest clubRegistRequest,
                                                @RequestPart(value = "img", required = false) MultipartFile img,
                                                @RequestParam("userId") int userId) throws IOException {
        Message message = new Message("클럽 등록에 성공했습니다.", clubService.registerClub(clubRegistRequest, img, userId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("/{clubId}")
    public ResponseEntity<Message> updateClub(@PathVariable int clubId,
                                              @RequestParam int userId,
                                              @RequestPart(value = "clubRegistRequest") ClubRegistRequest clubRegistRequest,
                                              @RequestPart(value = "img", required = false) MultipartFile img ) throws IOException {
        Message message = new Message("클럽 수정에 성공했습니다.", clubService.updateClub(userId, clubId, clubRegistRequest, img));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/calendar/{clubId}")
    public ResponseEntity<Message> getClubCalendar(@PathVariable int clubId, @RequestParam int year, @RequestParam int month){
        Message message = new Message("클럽 캘린더 정보를 조회했습니다.", clubService.getCalendar(clubId, year, month));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    //클럽 추천
    @GetMapping("/recommendation")
    public ResponseEntity<Message> getClubsRecommendation(@RequestParam int userId, @RequestParam int sorting){
        Message message = new Message("추천 클럽 조회에 성공했습니다.", clubService.getClubRecommendation(userId, sorting));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
