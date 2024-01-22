package com.ssafy.muscle_maker.dto.inbody.response;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class FindInbodyResponse {

    private Long inbodyId;
    private Float weight;
    private Float muscleMass;
    private Float fatMass;
    private LocalDateTime createdAt;

}
