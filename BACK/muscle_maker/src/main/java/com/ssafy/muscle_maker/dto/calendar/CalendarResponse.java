package com.ssafy.muscle_maker.dto.calendar;

import lombok.*;

import java.time.LocalDate;


@Getter
@Setter
@AllArgsConstructor
@Builder
public class CalendarResponse {
    private LocalDate date;
    private int achievePercent;
}
