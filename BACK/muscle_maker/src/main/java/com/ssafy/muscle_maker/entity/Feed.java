package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "feed")
public class Feed extends BaseTime {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int feedId;

    private String content;

    @Builder.Default
    private int favoriteCnt = 0;

    @Builder.Default
    private int commentCnt = 0;

    private int userId;

    private int clubId;

    @ToString.Exclude
    @OneToMany(mappedBy = "feed")
    @Setter
    private List<FeedTag> tags ;

    private String imgName;

    @Builder.Default
    private int visibility = 1; // 1 = 전체 공개, 2 = 팔로잉 공개 , 3 = 운동 클럽 , 4 = 식단 클럽 , 5 = 비공개

    public void updateFavoriteCnt(int favoriteCnt){
        this.favoriteCnt = favoriteCnt;
    }

    public void updateCommentCnt(int commentCnt){
        this.commentCnt = commentCnt;
    }
}
