package com.ssafy.muscle_maker.dto.Calendar.response;

import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class CalendarResponse {
    LocalDate date;
    int achievePercent;
}
