package com.ssafy.muscle_maker.dto.clubs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
@Data
@AllArgsConstructor
@Getter
public class ClubRegistRequest {

    private String title;
    private boolean category;
    private String image;
    private String goal;
}
