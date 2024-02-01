package com.ssafy.muscle_maker.dto.individualGoals.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class IndividualGoalDeleteRequest {

    private  String Authorization;
    private int individualGoalId;
}
