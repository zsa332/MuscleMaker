package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Inbody;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InbodyRepository extends JpaRepository<Inbody, Long> {

    Inbody findInbodyByInbodyId(Long inbodyId);

}
