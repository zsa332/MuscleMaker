package com.ssafy.muscle_maker.dto.routine.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class CheckSuccessResponse {
    private int exerciseId;
    private boolean success;
}
