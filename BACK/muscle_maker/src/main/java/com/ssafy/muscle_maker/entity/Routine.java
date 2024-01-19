package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "Routine")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Routine extends BaseTime {

    @Id
    @Column(name = "routine_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routine_id;

    private String title;

    private LocalDateTime date;

    private String which_day;

}
