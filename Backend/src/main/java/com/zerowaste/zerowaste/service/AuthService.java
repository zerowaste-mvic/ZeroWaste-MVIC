package com.zerowaste.zerowaste.service;

import com.zerowaste.zerowaste.dto.AuthResponse;
import com.zerowaste.zerowaste.dto.LoginRequest;
import com.zerowaste.zerowaste.dto.RegisterRequest;
import com.zerowaste.zerowaste.dto.UserResponse;
import com.zerowaste.zerowaste.exception.ApiException;
import com.zerowaste.zerowaste.model.User;
import com.zerowaste.zerowaste.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
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
                .build();

        User saved = userRepository.save(user);
        return buildAuthResponse(saved);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new ApiException("Invalid email or password.", HttpStatus.UNAUTHORIZED));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ApiException("Invalid email or password.", HttpStatus.UNAUTHORIZED);
        }

        return buildAuthResponse(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        String token = jwtService.generateToken(user);
        return new AuthResponse(token, UserResponse.from(user));
    }
}
