package com.zerowaste.zerowaste.dto;

import com.zerowaste.zerowaste.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String fullName;
    private String email;
    private String role;

    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getFullName(), user.getEmail(), user.getRole());
    }
}
