package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "follow")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Follow extends BaseTime{
    @Id
    @Column(name = "follow_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int followId;

    //follower -> following
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower")
    private User follower;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following")
    private User following;
}
