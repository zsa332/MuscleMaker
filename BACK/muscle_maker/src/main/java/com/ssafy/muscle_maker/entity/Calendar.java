package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "Calendar")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Calendar extends BaseTime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "calendar_id")
    private int calendarId;

    @Builder.Default
    private LocalDate date = LocalDate.now();

    @Column(name = "achieve_count")
    @Builder.Default
    private int achieveCount = 0;

    @Column(name = "member_count")
    @Builder.Default
    private int memberCount = 0;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;
}
