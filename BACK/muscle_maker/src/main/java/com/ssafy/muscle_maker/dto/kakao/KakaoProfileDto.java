package com.ssafy.muscle_maker.dto.kakao;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "id",
        "connected_at",
        "properties",
        "kakao_account"
})
public class KakaoProfileDto {

    @JsonProperty("id")
    public int id;
    @JsonProperty("connected_at")
    public String connectedAt;
    @JsonProperty("properties")
    public Properties properties;
    @JsonProperty("kakao_account")
    public KakaoAccount kakaoAccount;

}