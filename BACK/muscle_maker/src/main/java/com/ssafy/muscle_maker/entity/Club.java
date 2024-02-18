package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Entity
@Table(name = "club")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Club extends BaseTime {
    @Id
    @Column(name = "club_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clubId;

    @Column(name = "title", length = 50)
    private String title;

    //true은 식단, false은 운동
    @Column(name = "category")
    @Builder.Default
    private boolean category = false;

    @Column(name = "level")
    @Builder.Default
    private int level = 1;

    @Column(name = "image", length=255)
    private String image;

    @Column(name = "exp")
    @Builder.Default
    private int exp = 0;

    @Column(name = "success_days")
    @Builder.Default
    private int successDays = 0;

    @Column(name = "goal", length = 100)
    private String goal;

    @OneToMany(mappedBy = "club")
    private List<UserClub> userClubs;

    @OneToMany(mappedBy = "club")
    private List<Calendar> calendar;
}
