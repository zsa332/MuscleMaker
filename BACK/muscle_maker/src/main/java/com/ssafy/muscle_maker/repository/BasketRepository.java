package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Basket;
import com.ssafy.muscle_maker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Integer> {
    Basket findByUserAndFlagFalse(User user);
}
