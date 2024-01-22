package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Inbody;
import com.ssafy.muscle_maker.entity.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InbodyRepository extends JpaRepository<Inbody, Long> {

    List<Inbody> findAllByUser(User user);

}
