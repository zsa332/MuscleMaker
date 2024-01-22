package com.ssafy.muscle_maker.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class IndiviualGoal {

    @Id
    @GeneratedValue
    Long indiviualgoalId;

    Long kg;
    Long muscle;
    Long fat;


}
