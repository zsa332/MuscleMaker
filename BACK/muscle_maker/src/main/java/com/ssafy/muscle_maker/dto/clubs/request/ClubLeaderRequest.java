package com.ssafy.muscle_maker.dto.clubs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@Getter
public class ClubLeaderRequest {
    long leaderId;
    long memberId;
}
