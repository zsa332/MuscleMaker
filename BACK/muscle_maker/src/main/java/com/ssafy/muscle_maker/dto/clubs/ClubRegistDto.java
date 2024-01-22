package com.ssafy.muscle_maker.dto.clubs;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ClubRegistDto {

    private String title;
    private boolean category;
    private String image;
    private String goal;
}
