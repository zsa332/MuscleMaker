package com.ssafy.muscle_maker.dto.users.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ModifyPasswordRequest {
    String oldPassword;
    String newPassword;
}
