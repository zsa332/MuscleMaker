package com.ssafy.muscle_maker.dto.clubs.response;

import com.ssafy.muscle_maker.dto.calendar.CalendarResponse;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ClubCalendarResponse {
    private  int exp;
    private int completionPercent;
    private int successDays;
    private List<CalendarResponse> calendarResponses;
}
