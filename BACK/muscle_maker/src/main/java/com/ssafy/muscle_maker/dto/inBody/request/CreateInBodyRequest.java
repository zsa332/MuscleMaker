package com.ssafy.muscle_maker.dto.inBody.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateInBodyRequest {

    private Float weight;
    private Float muscleMass;
    private Float fatMass;

}
