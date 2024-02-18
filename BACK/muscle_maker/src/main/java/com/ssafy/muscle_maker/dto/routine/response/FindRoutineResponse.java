package com.ssafy.muscle_maker.dto.routine.response;

import com.ssafy.muscle_maker.dto.exercise.response.ExerciseResponse;
import jakarta.persistence.Column;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class FindRoutineResponse {

    private int routineId;

    private String title;

    private LocalDate date;

    private int whichDay; // 0 월, 1 화, 2 수, 3 목 ...

    private List<ExerciseResponse> exerciseResponseList;

}
