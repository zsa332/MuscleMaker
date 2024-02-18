package com.ssafy.muscle_maker.repository;

import com.ssafy.muscle_maker.entity.Comment;
import com.ssafy.muscle_maker.entity.Feed;
import com.ssafy.muscle_maker.entity.User;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;


@SpringBootTest
class CommentRepositoryTest {

    @Autowired CommentRepository commentRepository;

    @Test
    @Transactional
    public void commentInquiryTest(){
        for(int i = 0; i < 10; i++){
            commentRepository.save(Comment.builder()
                    .feed(Feed.builder().feedId(1).build())
                    .user(User.builder().userId(1).build())
                    .content("test"+i)
                    .build());
        }

        List<Comment> comments = commentRepository.findByFeedAndFlagFalse(Feed.builder().feedId(1).build());
        System.out.println(comments);
    }

    @Test
    @Transactional
    public void insertCommentTest(){
        Comment comment = Comment.builder()
                .feed(Feed.builder().feedId(1).build())
                .user(User.builder().userId(1).build())
                .content("insert test")
                .build();

        System.out.println(comment);
        commentRepository.save(comment);
        System.out.println(comment);
    }

    @Test
    @Transactional
    public void updateCommentTest(){
        Comment comment = Comment.builder()
                .feed(Feed.builder().feedId(1).build())
                .user(User.builder().userId(1).build())
                .content("insert test")
                .build();

        System.out.println("저장 전 : " + comment);
        commentRepository.save(comment);
        System.out.println("저장 후 : " + comment);
        comment.setContent("update test");
        commentRepository.save(comment);
        System.out.println("수정 후 : " + comment);
    }

    @Test
    @Transactional
    public void deleteCommentTest(){
        Comment comment = Comment.builder()
                .feed(Feed.builder().feedId(1).build())
                .user(User.builder().userId(1).build())
                .content("delete test")
                .build();

        System.out.println("저장 전 : " + comment);
        commentRepository.save(comment);
        System.out.println("저장 후 : " + comment);
        comment.setFlag(true);
        commentRepository.save(comment);
        System.out.println("삭제 후 : " + comment);
    }

}