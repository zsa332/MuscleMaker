package com.ssafy.muscle_maker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "Basket")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Basket {


    @Id
    private Long basket_id;

}
