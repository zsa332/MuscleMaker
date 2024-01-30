package com.ssafy.muscle_maker.dto.inBody.request;

import lombok.*;

@Data
@AllArgsConstructor
@Builder
public class CreateInBodyRequest {

    private Double weight;
    private Double muscleMass;
    private Double fatMass;

}
