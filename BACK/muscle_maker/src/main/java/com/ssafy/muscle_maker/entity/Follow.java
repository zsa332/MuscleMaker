package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "follow")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Follow {
    @Id
    @Column(name = "follow_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long followId;

    


}
