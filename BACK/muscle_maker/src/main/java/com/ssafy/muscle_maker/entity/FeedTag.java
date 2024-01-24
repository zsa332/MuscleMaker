package com.ssafy.muscle_maker.entity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "feed_tag")
@Builder
public class FeedTag  {

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
