package com.ssafy.muscle_maker.dto.routine.request;

import jakarta.persistence.Column;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class CreateRoutineRequest {

    private String title;

    private LocalDateTime date;

    private Long whichDay; // 0 월, 1 화, 2 수, 3 목 ...

    private Boolean settings;

}
