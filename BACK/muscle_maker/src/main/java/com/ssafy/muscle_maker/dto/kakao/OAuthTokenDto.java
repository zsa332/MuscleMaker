package com.ssafy.muscle_maker.dto.kakao;

import lombok.Data;

@Data
public class OAuthTokenDto {
    private String access_token;
    private String token_type;
    private String refresh_token;
    private int expire_in;
    private String scope;
    private int refresh_token_expires_in;
}
