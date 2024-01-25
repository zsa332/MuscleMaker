package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Calendar;
import com.ssafy.muscle_maker.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
    List<Calendar> findCalendarByClubAndFlagFalse(Club club);

    Calendar findCalendarByDateAndClubAndFlagFalse(LocalDate date, Club club);

}
