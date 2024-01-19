package com.ssafy.musclemaker.repository;

import com.ssafy.musclemaker.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByEmailId(String username);


}
