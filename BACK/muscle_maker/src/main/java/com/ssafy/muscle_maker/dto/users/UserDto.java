package com.ssafy.muscle_maker.dto.users;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.muscle_maker.entity.User;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Set;
import java.util.stream.Collectors;


@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserDto {

    private int userId;
    private String emailId;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String nickname;

    private String name;

    private String address;

    private int height;

    private int weight;

    private int age;

    private boolean gender;

    private String image;

    private Set<AuthorityDto> authorityDtoSet;

    public static UserDto from(User user) {
        if(user == null) return null;

        return UserDto.builder()
                .userId(user.getUserId())
                .emailId(user.getEmailId())
                .nickname(user.getNickname())
                .authorityDtoSet(user.getAuthorities().stream()
                        .map(authority -> AuthorityDto.builder().authorityName(authority.getAuthorityName()).build())
                        .collect(Collectors.toSet()))
                .address(user.getAddress())
                .age(user.getAge())
                .gender(user.isGender())
                .height(user.getHeight())
                .weight(user.getWeight())
                .image(user.getImage())
                .name(user.getName())
                .build();
    }
}
