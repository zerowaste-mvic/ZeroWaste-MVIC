package com.zerowaste.zerowaste.controller;

import com.zerowaste.zerowaste.dto.AuthResponse;
import com.zerowaste.zerowaste.dto.LoginOtpRequest;
import com.zerowaste.zerowaste.dto.LoginRequest;
import com.zerowaste.zerowaste.dto.LoginResponse;
import com.zerowaste.zerowaste.dto.MessageResponse;
import com.zerowaste.zerowaste.dto.RegisterRequest;
import com.zerowaste.zerowaste.dto.RegisterResponse;
import com.zerowaste.zerowaste.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public RegisterResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/login/verify")
    public AuthResponse verifyLoginOtp(@Valid @RequestBody LoginOtpRequest request) {
        return authService.verifyLogin2FA(request);
    }

    @PostMapping("/verify-email")
    public MessageResponse verifyEmail(@RequestParam String token) {
        return authService.verifyEmail(token);
    }
}
