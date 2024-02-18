package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "exercise")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Exercise extends BaseTime {

    @Id
    @Column(name = "exercise_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int exerciseId;

    @Column(length = 100)
    private String name; // 운동 명

    @Builder.Default
    private int setTime = 0; // 근력 : 세트 수, 유산소 : 분

    @Builder.Default
    private int number = 0; // 횟수

    @Builder.Default
    private boolean success = false; // 운동 성공 여부

    @Builder.Default
    private int weight = 0; //중량

    @Builder.Default
    private boolean type = false; // false 근력, true 유산소

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_id")
    private Routine routine;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "my_routine_id")
    private MyRoutine myRoutine;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "basket_id")
    private Basket basket;

    public void update(String name, int setTime, int number, boolean type){
        this.name = name;
        this.setTime = setTime;
        this.number = number;
        this.type = type;
    }

    public void deleteMyRoutine(){
        this.routine = null;
    }

    public void setSuccess(){
        this.success = !this.isSuccess();
    }

    public void setBasketFalse(){ this.basket = null; }

    public void setMyRoutine(MyRoutine myRoutine){ this.myRoutine = myRoutine; }
    public void setRoutine(Routine routine){ this.routine = routine; }

}
