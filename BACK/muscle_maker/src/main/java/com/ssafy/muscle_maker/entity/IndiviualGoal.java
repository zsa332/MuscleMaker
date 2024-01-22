package com.ssafy.muscle_maker.entity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.util.Lazy;

@Entity
@Getter
@ToString
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
