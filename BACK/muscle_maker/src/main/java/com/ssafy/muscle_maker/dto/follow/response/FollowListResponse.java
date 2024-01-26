package com.ssafy.muscle_maker.dto.follow.response;

import com.ssafy.muscle_maker.dto.follow.FollowUserDto;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class FollowListResponse {
    private List<FollowUserDto> followerList;
    private List<FollowUserDto> followingList;
}
