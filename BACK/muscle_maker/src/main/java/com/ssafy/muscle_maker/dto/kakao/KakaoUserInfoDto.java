package com.ssafy.muscle_maker.dto.kakao;


import lombok.*;

@Data
@Setter
@AllArgsConstructor
@Builder
public class KakaoUserInfoDto {
    private String emailId;
    private String password;
    private String nickname;
    private String image;
}
