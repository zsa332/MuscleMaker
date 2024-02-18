package com.ssafy.muscle_maker.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "individualGoal")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class IndividualGoal  extends BaseTime{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "individualGoal_id")
    private int individualGoalId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id" )
    private User user;

    @Builder.Default
    private Double kg = 0.0;

    @Builder.Default
    private Double muscle = 0.0;

    @Builder.Default
    private Double fat = 0.0;

    @Builder.Default
    private boolean diet = false; //true 다이어트 한다, false 증량

    public void update(double kg, double muscle, double fat, boolean diet){
        this.kg = kg;
        this.muscle = muscle;
        this.fat = fat;
        this.diet = diet;
    }

}
