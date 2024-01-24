package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Club;
import com.ssafy.muscle_maker.entity.UserClub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    //club 기본 정보 조회
    Club findClubByClubIdAndFlagFalse(Long club_id);
}
