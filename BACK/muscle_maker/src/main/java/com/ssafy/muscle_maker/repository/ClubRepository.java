package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubRepository extends JpaRepository<Club, Long> {
    //club 기본 정보 조회
    Club findClubByClubId(Long club_id);

    //club 성취율 조회


    //club 캘린더 관련 정보 조회

    //club 멤버 조회

    //추천 club 조회

    //사용자가 속한 클럽 조회


}
