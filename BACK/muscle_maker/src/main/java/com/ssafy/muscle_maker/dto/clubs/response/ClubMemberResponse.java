package com.ssafy.muscle_maker.dto.clubs.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ClubMemberResponse {
    private int userId;
    private String nickname;
    private  String image;

    private int completionPercent;
    private boolean completionToday;
}
