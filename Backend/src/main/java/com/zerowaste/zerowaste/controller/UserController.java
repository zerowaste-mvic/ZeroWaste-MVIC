package com.zerowaste.zerowaste.controller;


import com.zerowaste.zerowaste.dto.PrivacyRequest;
import com.zerowaste.zerowaste.dto.ToggleRequest;
import com.zerowaste.zerowaste.dto.UpdateProfileRequest;
import com.zerowaste.zerowaste.dto.UserResponse;
import com.zerowaste.zerowaste.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserResponse me(@AuthenticationPrincipal Long userId) {
        return userService.getProfile(userId);
    }

    @PutMapping("/me")
    public UserResponse updateProfile(
            @Valid @RequestBody UpdateProfileRequest request,
            @AuthenticationPrincipal Long userId) {
        return userService.updateProfile(userId, request);
    }

    @PutMapping("/me/privacy")
    public UserResponse updatePrivacy(
            @Valid @RequestBody PrivacyRequest request,
            @AuthenticationPrincipal Long userId) {
        return userService.updatePrivacy(userId, request);
    }
    @PutMapping("/me/two-factor")
    public UserResponse updateTwoFactor(
            @Valid @RequestBody ToggleRequest request,
            @AuthenticationPrincipal Long userId) {
        return userService.updateTwoFactor(userId, request.getEnabled());
    }

    @PutMapping("/me/expiry-alerts")
    public UserResponse updateExpiryAlerts(
            @Valid @RequestBody ToggleRequest request,
            @AuthenticationPrincipal Long userId) {
        return userService.updateExpiryAlerts(userId, request.getEnabled());
    }
}