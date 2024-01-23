package com.ssafy.muscle_maker.dto.inbody.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Setter
public class UpdateInbodyRequest {

    private Float weight;
    private Float muscleMass;
    private Float fatMass;

}
