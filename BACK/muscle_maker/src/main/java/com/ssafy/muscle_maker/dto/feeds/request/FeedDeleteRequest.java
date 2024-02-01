package com.ssafy.muscle_maker.dto.feeds.request;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class FeedDeleteRequest {
    private  String Authorization;
    private  int feedId;
}
