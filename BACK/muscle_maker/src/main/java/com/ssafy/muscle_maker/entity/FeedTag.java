package com.ssafy.muscle_maker.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FeedTag {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column(name = "feedtag_id")
    Long id;


    @ManyToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;


}
