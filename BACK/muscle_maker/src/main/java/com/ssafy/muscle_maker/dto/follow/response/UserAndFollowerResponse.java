package com.ssafy.muscle_maker.dto.follow.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserAndFollowerResponse {
    String nickname;
    String imgUrl;
    int userId;
    int followerNum;
    int feedNum;

}
