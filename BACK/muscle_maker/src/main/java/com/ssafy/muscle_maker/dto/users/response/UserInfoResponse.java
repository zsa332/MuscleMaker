package com.ssafy.muscle_maker.dto.users.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
@Setter
@AllArgsConstructor
@Builder
public class UserInfoResponse {
    private String emailId;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)

    private String password;


    private String nickname;


    private String name;

    private String address;

    private int height;

    private int weight;

    private int age;

    private boolean gender;

    private String image;
}
