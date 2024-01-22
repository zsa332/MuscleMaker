package com.ssafy.muscle_maker.dto.indiviualgoals.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class IndiviualgoalDeleteRequest {

    private  String Authorization;
    private Long individualGoalId;
}
