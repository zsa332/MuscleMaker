package com.ssafy.muscle_maker.service;

import com.ssafy.muscle_maker.dto.notification.NotificationDto;
import com.ssafy.muscle_maker.entity.Notification;
import com.ssafy.muscle_maker.entity.NotificationType;
import com.ssafy.muscle_maker.exception.CustomException;
import com.ssafy.muscle_maker.exception.ErrorCode;
import com.ssafy.muscle_maker.repository.EmitterRepository;
import com.ssafy.muscle_maker.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final EmitterRepository emitterRepository;
    private final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    public SseEmitter subscribe(int userId){
        String emitterId = String.valueOf(userId);

        SseEmitter sseEmitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));

        sseEmitter.onCompletion(() -> {
            emitterRepository.deleteByEmitterId(emitterId);
        });

        sseEmitter.onTimeout(() -> {
            emitterRepository.deleteByEmitterId(emitterId);
        });

        String eventId = makeTimeIncludeId(userId);
        sendNotification(sseEmitter, eventId, emitterId, "EventStream Created. [userId=" + userId + "]");
        if(notificationRepository.existsByReceiverIdAndIsReadFalse(userId)){
            sendLostNotification(sseEmitter, emitterId, userId);
        }

        return sseEmitter;
    }

    private void sendLostNotification(SseEmitter sseEmitter, String emitterId, int userId) {
        List<NotificationDto> notificationDtoList = new ArrayList<>();
        String eventId = makeTimeIncludeId(userId);
        notificationRepository.findByReceiverIdAndIsReadFalse(userId).forEach((notification) -> {
            System.out.println(notification);
            notificationDtoList.add(createNotificationDto(notification));
        });

        sendNotification(sseEmitter, eventId, emitterId, notificationDtoList);
    }

    private void sendNotification(SseEmitter emitter, String eventId, String emitterId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(eventId)
                    .data(data));
        } catch (IOException exception) {
            emitterRepository.deleteByEmitterId(emitterId);
        }
    }

    private String makeTimeIncludeId(int userId) {
        return userId + "_" + System.currentTimeMillis();
    }

    public void sendNotification(int receiverId, int senderId, NotificationType notificationType, String message) {
        Notification notification = notificationRepository.save(Notification.builder()
                .receiverId(receiverId).senderId(senderId)
                .notificationType(notificationType)
                .message(message)
                .isRead(false)
                .build());

        String emitterId = String.valueOf(receiverId);
        String eventId = makeTimeIncludeId(receiverId);
        SseEmitter sseEmitter = emitterRepository.findByEmitterId(emitterId);
        if(sseEmitter != null) sendNotification(sseEmitter, eventId, emitterId, createNotificationDto(notification));
    }

    public void readNotification(int notificationId){
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_NOTIFICATION));

        notification.readCheck();
        notificationRepository.save(notification);
    }

    public NotificationDto createNotificationDto(Notification notification) {
        return NotificationDto.builder()
                .notificationId(notification.getNotificationId())
                .message(notification.getMessage())
                .isRead(notification.getIsRead())
                .notificationType(notification.getNotificationType())
                .senderId(notification.getSenderId())
                .build();
    }
}
