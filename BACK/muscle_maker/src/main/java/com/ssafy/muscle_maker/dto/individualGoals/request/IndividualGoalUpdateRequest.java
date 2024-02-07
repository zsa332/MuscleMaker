package com.ssafy.muscle_maker.dto.individualGoals.request;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class IndividualGoalUpdateRequest {


    private int individualGoalId; // 개인목표 기본키 번호
    private int userId;
    private double kg;
    private double muscle;
    private double fat;

}
