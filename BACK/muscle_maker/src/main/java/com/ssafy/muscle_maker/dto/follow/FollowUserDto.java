package com.ssafy.muscle_maker.dto.follow;

import lombok.*;

@Data
@AllArgsConstructor
@Builder
public class FollowUserDto {
    private int userId;
    private String nickname;
}
