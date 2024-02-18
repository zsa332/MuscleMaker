package com.ssafy.muscle_maker.dto.feeds.request;

import com.ssafy.muscle_maker.entity.Feed;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FeedDto {
    private int feedId;

    private int userId;

    private int clubId;

    private String content;

    @Setter
    private String nickname;

    @Setter
    private String userImgUrl;

    @Setter
    private String imgUrl;

    private int commentCnt;

    private int favoriteCnt;

    private int visibility; // 1 = 전체 공개, 2 = 팔로잉 공개 , 3 = 운동 클럽 , 4 = 식단 클럽 , 5 = 비공개

    @Setter
    private boolean isFavorite;

    private boolean flag;

    @Setter
    private List<String> tags;

    private LocalDateTime createDate;

    private LocalDateTime updateDate;

    public Feed toEntity(){
        return Feed.builder()
                .content(this.content)
                .userId(this.userId)
                .clubId(this.clubId)
                .content(this.content)
                .visibility(this.visibility)
                .imgName(this.imgUrl)
                .build();
    }

    public FeedDto toDto(Feed feed){
        return FeedDto.builder()
                .feedId(feed.getFeedId())
                .userId(feed.getUserId())
                .clubId(feed.getClubId())
                .content(feed.getContent())
                .createDate(feed.getCreatedAt())
                .imgUrl(feed.getImgName())
                .commentCnt(feed.getCommentCnt())
                .favoriteCnt(feed.getFavoriteCnt())
                .build();
    }
}
