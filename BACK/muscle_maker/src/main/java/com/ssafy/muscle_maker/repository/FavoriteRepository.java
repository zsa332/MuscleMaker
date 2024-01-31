package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Favorite;
import com.ssafy.muscle_maker.entity.Feed;
import com.ssafy.muscle_maker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    boolean existsByUserAndFeed(User user, Feed feed);
    Favorite findByUserAndFeed(User user, Feed feed);

    List<Favorite> findByUser(User user);
}
