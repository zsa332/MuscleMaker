package com.ssafy.muscle_maker.dto.inbody.request;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CreateInbodyRequest {

    private Float weight;
    private Float muscleMass;
    private Float fatMass;

}
