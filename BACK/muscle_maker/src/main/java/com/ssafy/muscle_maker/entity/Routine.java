package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.scheduling.annotation.Scheduled;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "routine")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Routine extends BaseTime {

    @Id
    @Column(name = "routine_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int routineId;

    @Column(length = 50)
    private String title;

    @Builder.Default
    private LocalDate date = LocalDate.now();

    @Column(name = "which_day")
    @Builder.Default
    private int whichDay = LocalDate.now().getDayOfWeek().getValue(); // 1 월, 2 화, 3 수, 4 목 ...

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "routine")
    private List<Exercise> exercises;

}
