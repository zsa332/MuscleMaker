package com.ssafy.muscle_maker.dto.users.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
@Setter
@AllArgsConstructor
@Builder
public class loginDto {
    private String token;
    private int userId;
}
