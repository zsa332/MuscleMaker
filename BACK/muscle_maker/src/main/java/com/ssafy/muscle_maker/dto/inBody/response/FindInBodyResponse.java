package com.ssafy.muscle_maker.dto.inBody.response;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class FindInBodyResponse {

    private int inBodyId;
    private Double weight;
    private double muscleMass;
    private double fatMass;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

}
