package com.ssafy.muscle_maker.dto.feeds.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class FeedWriteResponse {

    private int feedId;
    private String content;
    private int favoritecnt;
    private int commentcnt;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private int userId;
    private int clubId;
    private List<String> tags;
    private String imgName;
    private int visibility;// 1 = 전체 공개, 2 = 팔로잉 공개 , 3 = 운동 클럽 , 4 = 식단 클럽 , 5 = 비공개


}
