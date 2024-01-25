package com.ssafy.muscle_maker.dto.follow;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class FollowRequest {
    private long followerId;
    private long followingId;
}
