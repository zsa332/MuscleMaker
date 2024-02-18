package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "my_routine")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyRoutine extends BaseTime{

    @Id
    @Column(name = "my_routine_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int myRoutineId;

    @Column(length = 50)
    private String title;

    @Column(name = "which_day")
    private int whichDay; // 1 월, 2 화, 3 수, 4 목 ...

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "myRoutine")
    private List<Exercise> exercises;

}
