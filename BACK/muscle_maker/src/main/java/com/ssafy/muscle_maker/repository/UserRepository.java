package com.ssafy.muscle_maker.repository;


import com.ssafy.muscle_maker.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByEmailId(String emailId);

    //멤버 기본 정보 조회
    Optional<User> findByUserIdAndFlagFalse(int userId);

    Optional<User> findByEmailIdAndFlagFalse(String emailId);

    Boolean existsByEmailIdAndFlagFalse(String emailId);

    Optional<List<User>> findByNicknameContaining(String nickname);

}