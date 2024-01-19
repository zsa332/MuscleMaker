package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "UserClub")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserClub {
    @Id
    @Column(name = "user_club_id")
    private Long userClubId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    @Column(name="authority")
    private int authority;
}
