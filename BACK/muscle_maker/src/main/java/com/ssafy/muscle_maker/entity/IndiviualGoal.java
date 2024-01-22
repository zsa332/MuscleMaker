package com.ssafy.muscle_maker.entity;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "indiviualgoals")
public class IndiviualGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "indiviualgoal_id")
    private Long individualGoalId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id" )
    private User user;


    private Double kg;
    private Double muscle;
    private Double fat;


}
