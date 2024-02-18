package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "inBody")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InBody extends BaseTime{

    @Id
    @Column(name = "inBody_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int inBodyId;

    @Builder.Default
    private Double weight = 0.0;

    @Builder.Default
    private Double muscleMass = 0.0;

    @Builder.Default
    private Double fatMass = 0.0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
