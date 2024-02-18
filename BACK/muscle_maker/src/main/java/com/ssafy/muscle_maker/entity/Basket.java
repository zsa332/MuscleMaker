package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "basket")
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Basket extends BaseTime {

    @Id
    @Column(name = "basket_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int basketId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "basket")
    private List<Exercise> exercises;

}
