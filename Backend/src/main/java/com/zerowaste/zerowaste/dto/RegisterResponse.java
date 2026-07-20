package com.zerowaste.zerowaste.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Returned after successful registration. No token is issued here — the
 * account cannot be logged into until the user clicks the verification
 * link sent to their email.
 */
@Getter
@AllArgsConstructor
public class RegisterResponse {
    private UserResponse user;
    private String message;
}