package com.ssafy.muscle_maker.dto.feeds.request;


import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class FeedUpdateRequest {

    private  String Authorizaiton;
    private String content;
    private Long feedId;
    private Long  clubId ;
    private Long userId;
    private int visibility;
    private String imgName;
    private List<String> tags;
}
