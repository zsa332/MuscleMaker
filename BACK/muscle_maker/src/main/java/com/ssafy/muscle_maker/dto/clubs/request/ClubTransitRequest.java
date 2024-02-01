package com.ssafy.muscle_maker.dto.clubs.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ClubTransitRequest {
    private int clubId;
    private int userId;
}
