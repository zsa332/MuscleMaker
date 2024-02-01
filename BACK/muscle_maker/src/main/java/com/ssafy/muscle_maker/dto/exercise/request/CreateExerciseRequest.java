package com.ssafy.muscle_maker.dto.exercise.request;

import lombok.*;

@AllArgsConstructor
@Builder
@Setter
@Getter
public class CreateExerciseRequest {

    private String name; // 운동 명

    private int setTime; // 근력 : 세트 수, 유산소 : 분

    private int number; // 횟수

    private boolean success; // 운동 성공 여부

    private int weight; //중량

    private boolean type; // false 근력, true 유산소

}
