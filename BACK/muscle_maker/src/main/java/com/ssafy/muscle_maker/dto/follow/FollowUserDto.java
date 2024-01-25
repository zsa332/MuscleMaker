package com.ssafy.muscle_maker.dto.follow;

import lombok.*;

@Data
@AllArgsConstructor
@Builder
public class FollowUserDto {
    private long userId;
    private String nickname;
}
