package com.ssafy.muscle_maker.dto.indiviualgoals.request;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class IndiviualgoalWriteRequest {

    private  Long userId;
    private double kg;
    private double muscle;
    private double fat;

}
