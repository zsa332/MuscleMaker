package com.ssafy.muscle_maker.dto.inBody.request;

import lombok.*;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Setter
public class UpdateInBodyRequest {
    private double weight;
    private double muscleMass;
    private double fatMass;

}