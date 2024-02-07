package com.ssafy.muscle_maker.dto.notification;

import com.ssafy.muscle_maker.entity.NotificationType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotificationDto {
    private int notificationId;
    private String message;
    private Boolean isRead;
    private NotificationType notificationType;
    private int senderId;
}
