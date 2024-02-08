package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Notification;
import com.ssafy.muscle_maker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    boolean existsByReceiverIdAndIsReadFalse(int receiverId);
    List<Notification> findByReceiverIdAndIsReadFalse(int receiverId);
}
