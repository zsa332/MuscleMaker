package com.ssafy.muscle_maker.dto.clubs.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ClubRegistRequest {

    private String title;
    private boolean category;
    private String image;
    private String goal;
}
