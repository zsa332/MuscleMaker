package com.ssafy.muscle_maker.dto.indiviualgoals.response;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class IndiviualgoalResponse {

    private Long individualGoalId; // 개인목표 기본키 번호
    private  Long Id;
    private double kg;
    private double muscle;
    private double fat;

}
