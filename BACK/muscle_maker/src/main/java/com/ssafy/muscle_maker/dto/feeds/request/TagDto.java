package com.ssafy.muscle_maker.dto.feeds.request;


import com.ssafy.muscle_maker.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TagDto {

    int tagId;
    String tag;

    public Tag toEntity(TagDto tagDto){
        return Tag.builder()
                .tagId(this.tagId)
                .tag(tag).build();
    }
}
