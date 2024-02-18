package com.ssafy.muscle_maker.service;

import com.ssafy.muscle_maker.dto.feeds.comment.CommentDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CommentServiceTest {

    @Autowired CommentService commentService;

    @Test
    void registComment() {
        CommentDto commentDto = commentService.registComment(
                CommentDto.builder()
                        .feedId(1)
                        .userId(1)
                        .content("test")
                        .build()
        );
        System.out.println(commentDto);
    }

    @Test
    void updateComment() {
        CommentDto commentDto = commentService.registComment(
                CommentDto.builder()
                        .feedId(1)
                        .userId(1)
                        .content("test")
                        .build()
        );

        CommentDto updateDto = commentService.updateComment(
                CommentDto.builder()
                        .commentId(commentDto.getCommentId())
                        .feedId(1)
                        .userId(1)
                        .content("update")
                        .build()
        );

        System.out.println(commentDto);
        System.out.println(updateDto);

        System.out.println(commentService.getComments(1));
    }

    @Test
    void deleteComment() {
        CommentDto commentDto = commentService.registComment(
                CommentDto.builder()
                        .feedId(1)
                        .userId(1)
                        .content("test")
                        .build()
        );

        commentService.deleteComment(commentDto.getCommentId());

        System.out.println(commentDto);

        System.out.println(commentService.getComments(1));
    }

}