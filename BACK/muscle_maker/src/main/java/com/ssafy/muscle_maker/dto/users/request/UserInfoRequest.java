package com.ssafy.muscle_maker.dto.users.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
@Setter
@AllArgsConstructor
@Builder
public class UserInfoRequest {
    private String nickname;

    private Boolean gender;

    private String name;

    private String address;

    private int height;

    private int weight;

    private int age;

    private String image;
}
