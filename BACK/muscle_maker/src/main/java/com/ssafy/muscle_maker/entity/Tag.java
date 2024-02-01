package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Table(name = "tag")
@Builder
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Tag {

    @Id @ GeneratedValue
    @Column(name = "tag_id")
    private int tagId;

    @Column(unique = true)
    private String tag;

    @OneToMany (mappedBy = "tag")
    private List<FeedTag> feedTags;



}

