package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@Table(name = "feed_comment")
@AllArgsConstructor
@NoArgsConstructor
public class Comment extends BaseTime {
    @Id
    @Column(name = "comment_id")
    @GeneratedValue
    private Long commentId;

    private String content;

    @ManyToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
