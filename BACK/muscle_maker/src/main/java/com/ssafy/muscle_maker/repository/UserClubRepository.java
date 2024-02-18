package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Club;
import com.ssafy.muscle_maker.entity.User;
import com.ssafy.muscle_maker.entity.UserClub;
import lombok.Setter;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserClubRepository extends JpaRepository<UserClub, Integer> {

    List<UserClub> findAllByUserAndFlagFalse(User user);
    Optional<UserClub> findByUserAndClubAndFlagFalse(User user, Club club);
    List<UserClub> findByClubAndFlagFalse(Club club);
    UserClub findByClubAndFlagFalseOrderByAchieveCountDesc(Club club);
    UserClub findFirstByClubAndFlagFalseOrderByAchieveCount(Club club);

}
