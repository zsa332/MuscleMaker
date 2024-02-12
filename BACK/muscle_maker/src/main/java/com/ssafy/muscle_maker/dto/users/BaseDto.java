package com.ssafy.muscle_maker.dto.users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class BaseDto {

    private String nickname;
    private String name;
    private int userId;
    private String image;
}
