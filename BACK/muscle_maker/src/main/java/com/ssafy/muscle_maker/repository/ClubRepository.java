package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClubRepository extends JpaRepository<Club, Integer> {
    //club 기본 정보 조회
    Optional<Club> findClubByClubIdAndFlagFalse(int club_id);

    List<Club> findAll();

    boolean existsByTitleContaining(String title);

    boolean existsByTitleContainingAndClubIdNotLikeAndFlagFalse(String title, int clubId);

    Optional<List<Club>> findByTitleContainingAndFlagFalse(String title);


}
