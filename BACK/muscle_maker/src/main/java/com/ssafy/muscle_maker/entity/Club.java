package com.ssafy.muscle_maker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Club {
    @Id
    @Column(name = "club_id")
    private long clubId;

    
}
