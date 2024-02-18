package com.ssafy.muscle_maker.dto.clubs.response;

import com.ssafy.muscle_maker.entity.UserClub;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ClubResponse {
     private int clubId;

     private String title;

     private boolean category;

     private int level;

     private String image;

     private int exp;

     private int successDays;

     private String goal;

     private int memberCnt;
}
