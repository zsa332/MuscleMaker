package com.ssafy.muscle_maker.entity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.util.Lazy;

@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IndiviualGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long individualGoalId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id" )
    private Long id;


    private Double kg;
    private Double muscle;
    private Double fat;

}
