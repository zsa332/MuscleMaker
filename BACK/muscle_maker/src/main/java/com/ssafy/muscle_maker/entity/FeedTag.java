package com.ssafy.muscle_maker.entity;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "feed_tag")
public class FeedTag extends BaseTime {

    @Id @GeneratedValue
    @Column(name = "feed_tag_id")
    private Long feedTagId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;


}
