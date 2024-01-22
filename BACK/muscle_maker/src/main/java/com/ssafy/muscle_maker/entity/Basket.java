package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "basket")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Basket extends BaseTime {

    @Id
    @Column(name = "basket_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long basketId;

    @OneToOne(mappedBy = "basket")
    private User user;

    @OneToMany(mappedBy = "basket")
    private List<Exercise> exercises;

}
