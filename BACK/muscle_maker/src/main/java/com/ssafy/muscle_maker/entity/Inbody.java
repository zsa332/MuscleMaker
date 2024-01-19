package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Inbody")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Inbody extends BaseTime{

    @Id
    @Column(name = "inbody_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inbody_id;

    private Float weight;

    private Float muscle_mass;

    private Float fat_mass;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
