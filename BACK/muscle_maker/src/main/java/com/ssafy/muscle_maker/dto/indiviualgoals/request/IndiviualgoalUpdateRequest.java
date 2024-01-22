package com.ssafy.muscle_maker.dto.indiviualgoals.request;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class IndiviualgoalUpdateRequest {


    private Long individualGoalId; // 개인목표 기본키 번호
    private  Long Id;
    private double kg;
    private double muscle;
    private double fat;

}
