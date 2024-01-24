package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
}
