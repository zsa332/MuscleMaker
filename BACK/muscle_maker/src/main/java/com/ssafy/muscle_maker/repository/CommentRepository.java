package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Comment;
import com.ssafy.muscle_maker.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Comment findByCommentId(int commentId);
    List<Comment> findByFeedAndFlagFalse(Feed feed);
}
