package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GoalAchieve {
    @Id
    @Column(name = "goal_achieve_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalAchieveId;

    @Column(name = "date")
    private Date date;

    @Column(name ="achieve_percent")
    private int achieve_percent;


}
