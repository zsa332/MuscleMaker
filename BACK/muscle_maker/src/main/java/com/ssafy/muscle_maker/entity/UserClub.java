package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Entity
@Table(name = "user_club")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserClub extends BaseTime{

    @Id
    @Column(name = "user_club_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userClubId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    //0은 방장, 1은 회원, 2는 대기자
    @Column(name="authority")
    @Builder.Default
    private int authority = 2;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private Club club;


    @Column(name = "achieve_count")
    @Builder.Default
    private int achieveCount = 0;

    @Column(name = "achieve_today")
    @Builder.Default
    private boolean achieveToday = false;
}
