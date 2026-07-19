package com.zerowaste.zerowaste.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private UserResponse user;
    private boolean twoFactorRequired;
    private String message;
}
