package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@Table(name = "notification")
@AllArgsConstructor
@NoArgsConstructor
public class Notification extends BaseTime{
    @Id
    @Column(name = "notification_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int notificationId;

    @Column(length = 200)
    private String message;

    @Column(nullable = false)
    private Boolean isRead;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType notificationType;

    private int senderId;

    private int receiverId;

    public void readCheck(){
        isRead = true;
    }
}
