package com.ssafy.muscle_maker.service;

import com.ssafy.muscle_maker.dto.feeds.comment.CommentDto;
import com.ssafy.muscle_maker.entity.Comment;
import com.ssafy.muscle_maker.entity.Feed;
import com.ssafy.muscle_maker.exception.CustomException;
import com.ssafy.muscle_maker.exception.ErrorCode;
import com.ssafy.muscle_maker.repository.CommentRepository;
import com.ssafy.muscle_maker.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final FeedRepository feedRepository;

    public CommentDto registComment(CommentDto commentDto){
        Comment comment = commentDto.toEntity();
        Feed feed = comment.getFeed();
        feed.updateCommentCnt(feed.getCommentCnt() + 1);
        feedRepository.save(feed);
        commentRepository.save(comment);
        return commentDto.toDto(comment);
    }

    public CommentDto updateComment(CommentDto commentDto){
        Comment comment = commentDto.toEntity();
        if(commentRepository.existsByCommentId(comment.getCommentId()))
            commentRepository.save(comment);
        else throw new CustomException(ErrorCode.NO_FEED_COMMENT);
        return commentDto.toDto(comment);
    }

    public void deleteComment(int commentId){
        Comment comment = commentRepository.findByCommentId(commentId);
        comment.setFlag(true);
        commentRepository.save(comment);
        Feed feed = comment.getFeed();
        feed.updateCommentCnt(feed.getCommentCnt() - 1);
        feedRepository.save(feed);
    }

    public List<CommentDto> getComments(int feedId){
        List<CommentDto> commentDtos = new ArrayList<>();

        commentRepository.findByFeedAndFlagFalse(Feed.builder().feedId(feedId).build()).forEach((comment) -> {
            commentDtos.add(new CommentDto().toDto(comment));
        });

        return commentDtos;
    }

}
