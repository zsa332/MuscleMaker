package com.ssafy.muscle_maker.dto.feeds.comment;

import com.ssafy.muscle_maker.entity.Comment;
import com.ssafy.muscle_maker.entity.Feed;
import com.ssafy.muscle_maker.entity.User;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {

    private int commentId;

    private int userId;

    private int feedId;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    public Comment toEntity(){
        return Comment.builder()
                .commentId(commentId)
                .feed(Feed.builder().feedId(feedId).build())
                .user(User.builder().userId(userId).build())
                .content(content)
                .build();
    }

    public CommentDto toDto(Comment comment){
        return CommentDto.builder()
                .commentId(comment.getCommentId())
                .feedId(comment.getFeed().getFeedId())
                .userId(comment.getUser().getUserId())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .modifiedAt(comment.getModifiedAt())
                .build();
    }
}
