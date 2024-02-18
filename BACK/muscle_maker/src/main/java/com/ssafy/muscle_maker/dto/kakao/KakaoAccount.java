package com.ssafy.muscle_maker.dto.kakao;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "profile_nickname_needs_agreement",
        "profile_image_needs_agreement",
        "profile"
})
public class KakaoAccount {

    @JsonProperty("profile_nickname_needs_agreement")
    public Boolean profileNicknameNeedsAgreement;
    @JsonProperty("profile_image_needs_agreement")
    public Boolean profileImageNeedsAgreement;
    @JsonProperty("profile")
    public Profile profile;

}