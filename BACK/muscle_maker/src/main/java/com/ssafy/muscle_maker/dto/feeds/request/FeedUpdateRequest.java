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
    private int feedId;
    private int  clubId ;
    private int userId;
    private int visibility;
    private String imgName;
    private List<String> tags;
}
