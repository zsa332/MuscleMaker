package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "Basket")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Basket {

    @Id
    @Column(name = "basket_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long basket_id;

    @OneToOne(mappedBy = "basket")
    private User user;

    @OneToMany(mappedBy = "basket")
    private List<Exercise> exercises;

}
