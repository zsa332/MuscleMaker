package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.InBody;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InBodyRepository extends JpaRepository<InBody, Long> {

}
