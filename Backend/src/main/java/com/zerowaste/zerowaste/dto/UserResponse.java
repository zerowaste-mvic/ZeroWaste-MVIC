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
    private String gender;
    private String address;
    private Integer householdSize;
    private Boolean donationPublic;
    private Boolean twoFactorEnabled;
    private Boolean pendingTwoFactor; // for 2FA OTP verification process, not for regular authentication
    private Boolean notificationsEnabled;
    private Boolean expiryAlertsEnabled;
    private Boolean donationUpdatesEnabled;

    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.getGender(),
                user.getAddress(),
                user.getHouseholdSize(),
                user.getDonationPublic(),
                user.getTwoFactorEnabled(),
                user.getPendingTwoFactor(),
                user.getNotificationsEnabled(),
                user.getExpiryAlertsEnabled(),
                user.getDonationUpdatesEnabled()
        );
    }
}
