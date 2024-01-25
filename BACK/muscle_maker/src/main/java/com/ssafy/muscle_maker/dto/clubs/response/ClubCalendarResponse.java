package com.ssafy.muscle_maker.dto.clubs.response;

import com.ssafy.muscle_maker.dto.Calendar.response.CalendarResponse;
import lombok.*;

import java.util.List;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClubCalendarResponse {
    int exp;
    int completionPercent;
    int successDays;
    List<CalendarResponse> calendarResponses;
}
