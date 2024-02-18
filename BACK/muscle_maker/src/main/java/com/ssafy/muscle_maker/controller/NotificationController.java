package com.ssafy.muscle_maker.controller;

import com.ssafy.muscle_maker.controller.constants.Message;
import com.ssafy.muscle_maker.controller.constants.StatusCode;
import com.ssafy.muscle_maker.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping(value = "/subscribe/{userId}", produces = "text/event-stream")
    public SseEmitter subscribe(@PathVariable int userId) {
        return notificationService.subscribe(userId);
    }

    @GetMapping("/read/{notificationId}")
    public ResponseEntity<Message> readNotification(@PathVariable int notificationId){
        notificationService.readNotification(notificationId);
        return ResponseEntity.status(StatusCode.OK).body(new Message(notificationId + "번 알림을 읽음 표시 하였습니다."));
    }

}
