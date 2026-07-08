package com.zerowaste.zerowaste.service;

import com.zerowaste.zerowaste.dto.PrivacyRequest;
import com.zerowaste.zerowaste.dto.UpdateProfileRequest;
import com.zerowaste.zerowaste.dto.UserResponse;
import com.zerowaste.zerowaste.exception.ApiException;
import com.zerowaste.zerowaste.model.User;
import com.zerowaste.zerowaste.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse getProfile(Long userId) {
        User user = findUser(userId);
        return UserResponse.from(user);
    }

    public UserResponse updateProfile(Long userId, UpdateProfileRequest request) {
        User user = findUser(userId);

        String newEmail = request.getEmail().toLowerCase().trim();
        if (!newEmail.equalsIgnoreCase(user.getEmail())
                && userRepository.existsByEmail(newEmail)) {
            throw new ApiException("An account with this email already exists.", HttpStatus.CONFLICT);
        }

        user.setFullName(request.getFullName().trim());
        user.setEmail(newEmail);
        user.setGender(blankToNull(request.getGender()));
        user.setAddress(blankToNull(request.getAddress()));

        return UserResponse.from(userRepository.save(user));
    }

    public UserResponse updatePrivacy(Long userId, PrivacyRequest request) {
        User user = findUser(userId);
        user.setDonationPublic(request.getDonationPublic());
        return UserResponse.from(userRepository.save(user));
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiException("User not found.", HttpStatus.NOT_FOUND));
    }

    private String blankToNull(String value) {
        if (value == null || value.isBlank()) return null;
        return value.trim();
    }
}