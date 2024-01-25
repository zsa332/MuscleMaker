package com.ssafy.muscle_maker.dto.inBody.response;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class FindInBodyResponse {

    private Long inBodyId;
    private Float weight;
    private Float muscleMass;
    private Float fatMass;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

}
