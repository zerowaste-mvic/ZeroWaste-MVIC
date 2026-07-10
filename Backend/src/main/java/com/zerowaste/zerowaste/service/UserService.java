package com.zerowaste.zerowaste.service;

import com.zerowaste.zerowaste.dto.PrivacyRequest;
import com.zerowaste.zerowaste.dto.UpdateProfileRequest;
import com.zerowaste.zerowaste.dto.UserResponse;
import com.zerowaste.zerowaste.exception.ApiException;
import com.zerowaste.zerowaste.model.Notification;
import com.zerowaste.zerowaste.model.User;
import com.zerowaste.zerowaste.repository.NotificationRepository;
import com.zerowaste.zerowaste.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    public UserService(UserRepository userRepository, NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
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
        User saved = userRepository.save(user);

        boolean isPublic = Boolean.TRUE.equals(request.getDonationPublic());
        notify(userId, isPublic ? "PRIVACY_PUBLIC" : "PRIVACY_PRIVATE", "Donations",
                "Donation Privacy Updated",
                isPublic
                        ? "Your donations are now public and visible to everyone in Browse Food Item."
                        : "Your donations are now private and only visible to you.");

        return UserResponse.from(saved);
    }

    public UserResponse updateTwoFactor(Long userId, boolean enabled) {
        User user = findUser(userId);
        user.setTwoFactorEnabled(enabled);
        User saved = userRepository.save(user);

        notify(userId, enabled ? "TWO_FACTOR_ON" : "TWO_FACTOR_OFF", "System",
                "Two-Factor Authentication Updated",
                enabled
                        ? "Two-factor authentication has been turned on for your account."
                        : "Two-factor authentication has been turned off for your account.");

        return UserResponse.from(saved);
    }

    public UserResponse updateExpiryAlerts(Long userId, boolean enabled) {
        User user = findUser(userId);
        user.setExpiryAlertsEnabled(enabled);
        User saved = userRepository.save(user);

        notify(userId, enabled ? "EXPIRY_ALERTS_ON" : "EXPIRY_ALERTS_OFF", "Alerts",
                "Expiry Alerts Updated",
                enabled
                        ? "Expiry alert notifications have been turned on."
                        : "Expiry alert notifications have been turned off.");

        return UserResponse.from(saved);
    }

    private void notify(Long userId, String type, String category, String title, String message) {
        notificationRepository.save(Notification.builder()
                .userId(userId)
                .type(type)
                .category(category)
                .title(title)
                .message(message)
                .read(false)
                .resolved(true)
                .build());
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