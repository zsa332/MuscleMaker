package com.ssafy.muscle_maker.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {
    @NotNull
    @Size(min = 3, max = 50)
    private String emailId;

    @NotNull
    @Size(min = 3, max = 100)
    private String password;
}
