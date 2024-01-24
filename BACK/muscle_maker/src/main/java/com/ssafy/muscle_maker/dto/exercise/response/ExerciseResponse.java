package com.ssafy.muscle_maker.dto.exercise.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Setter
public class ExerciseResponse {

    private Long exerciseId;

    private String name; // 운동 명

    private Long setTime; // 근력 : 세트 수, 유산소 : 분

    private Long number; // 횟수

    private boolean success; // 운동 성공 여부

    private Long weight; //중량

}
