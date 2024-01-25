package com.ssafy.muscle_maker.dto.routine.request;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class CreateRoutineSettingRequest {

    private String title;
    private Long whichDay; // 0 월, 1 화, 2 수, 3 목 ...

}
