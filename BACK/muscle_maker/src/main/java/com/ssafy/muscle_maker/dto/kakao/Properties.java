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
        "nickname",
        "profile_image",
        "thumbnail_image"
})
public class Properties {

    @JsonProperty("nickname")
    public String nickname;
    @JsonProperty("profile_image")
    public String profileImage;
    @JsonProperty("thumbnail_image")
    public String thumbnailImage;

}