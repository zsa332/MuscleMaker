package com.ssafy.muscle_maker.dto.inBody.request;

import lombok.*;

@Data
@AllArgsConstructor
@Builder
public class CreateInBodyRequest {

    private Float weight;
    private Float muscleMass;
    private Float fatMass;

}
