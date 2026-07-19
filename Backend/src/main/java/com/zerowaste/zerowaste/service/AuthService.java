package com.zerowaste.zerowaste.service;

import com.zerowaste.zerowaste.dto.AuthResponse;
import com.zerowaste.zerowaste.dto.LoginOtpRequest;
import com.zerowaste.zerowaste.dto.LoginRequest;
import com.zerowaste.zerowaste.dto.LoginResponse;
import com.zerowaste.zerowaste.dto.RegisterRequest;
import com.zerowaste.zerowaste.dto.UserResponse;
import com.zerowaste.zerowaste.exception.ApiException;
import com.zerowaste.zerowaste.model.User;
import com.zerowaste.zerowaste.repository.UserRepository;
import com.zerowaste.zerowaste.service.TwoFactorService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TwoFactorService twoFactorService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       TwoFactorService twoFactorService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.twoFactorService = twoFactorService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail().toLowerCase())) {
            throw new ApiException("An account with this email already exists.", HttpStatus.CONFLICT);
        }

        User user = User.builder()
                .fullName(request.getFullName().trim())
                .email(request.getEmail().toLowerCase().trim())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .householdSize(normalizeHouseholdSize(request.getHouseholdSize()))
                .build();

        User saved = Objects.requireNonNull(userRepository.save(user), "Failed to save user");
        return buildAuthResponse(saved);
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new ApiException("Invalid email or password.", HttpStatus.UNAUTHORIZED));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ApiException("Invalid email or password.", HttpStatus.UNAUTHORIZED);
        }

        if (Boolean.TRUE.equals(user.getTwoFactorEnabled())) {
            twoFactorService.initiateLogin2FA(user);
            return new LoginResponse(
                    null,
                    UserResponse.from(user),
                    true,
                    "A 6-digit verification code has been sent to your registered email address.");
        }

        return new LoginResponse(jwtService.generateToken(user), UserResponse.from(user), false, null);
    }

    public AuthResponse verifyLogin2FA(LoginOtpRequest request) {
        User user = twoFactorService.verifyLogin2FA(request.getEmail(), request.getCode());
        return buildAuthResponse(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        String token = jwtService.generateToken(user);
        return new AuthResponse(token, UserResponse.from(user));
    }

    private Integer normalizeHouseholdSize(Integer householdSize) {
        if (householdSize == null) {
            return null;
        }
        return Math.max(1, householdSize);
    }
}