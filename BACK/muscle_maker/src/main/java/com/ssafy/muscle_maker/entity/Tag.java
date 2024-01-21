package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@Getter
@ToString
@AllArgsConstructor
@Builder
public class Tag {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    Long id;


    @Column(unique = true)
    String tag;


}

