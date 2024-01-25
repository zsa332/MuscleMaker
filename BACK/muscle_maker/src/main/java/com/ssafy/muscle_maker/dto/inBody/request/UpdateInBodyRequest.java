package com.ssafy.muscle_maker.dto.inBody.request;

import lombok.*;

@Data
@AllArgsConstructor
@Builder
@Setter
public class UpdateInBodyRequest {
    private Float weight;
    private Float muscleMass;
    private Float fatMass;

}
