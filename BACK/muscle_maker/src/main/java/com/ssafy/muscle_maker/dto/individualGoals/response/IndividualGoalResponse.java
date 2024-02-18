package com.ssafy.muscle_maker.dto.individualGoals.response;


import com.ssafy.muscle_maker.entity.IndividualGoal;
import com.ssafy.muscle_maker.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class IndividualGoalResponse {

    private int individualGoalId;
    private int userId;
    private double kg;
    private double muscle;
    private double  fat;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private boolean flag;
    private boolean diet;

    public IndividualGoal toEntity(){
        return IndividualGoal.builder()
                .individualGoalId(this.individualGoalId)
                .user(User.builder().userId(this.userId).build())
                .fat(this.fat)
                .kg(this.kg)
                .muscle(this.muscle)
                .diet(this.diet)
                .build();
    }
    public IndividualGoalResponse toDTO(IndividualGoal individualGoal){
        return IndividualGoalResponse.builder()
                .individualGoalId(individualGoal.getIndividualGoalId())
                .userId(individualGoal.getUser().getUserId())
                .kg(individualGoal.getKg())
                .muscle(individualGoal.getMuscle())
                .fat(individualGoal.getFat())
                .createdAt(individualGoal.getCreatedAt())
                .modifiedAt(individualGoal.getModifiedAt())
                .flag(individualGoal.isFlag())
                .diet(individualGoal.isDiet())
                .build();

    }

}
