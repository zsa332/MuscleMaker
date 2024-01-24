package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Entity
@Getter
@Table(name = "tag")
@Builder
public class Tag {

    @Id @ GeneratedValue
    @Column(name = "tag_id")
    private Long tagId;

    @Column(unique = true)
    private String tag;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    private List<FeedTag> feedTags;


}

