package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.GoalAchieve;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalAchieveRepository {
    //클럽id와 사용자id가 주어졌을 때 목표 찾기
    List<GoalAchieve> findAllByClubIdAndUserId(long clubId, long userId);

}
