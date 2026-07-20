package com.zerowaste.zerowaste.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "profile_image_url", length = 2048)
    private String profileImageUrl;

    @Column(nullable = false)
    @Builder.Default
    private String role = "USER";

    private String gender;

    private String address;

    @Column(name = "household_size")
    private Integer householdSize;

    /**
     * Privacy setting: when true, this user's donations are visible to everyone
     * in Browse Food Item. When false, their donations are only visible to
     * themselves (still shown in their own browse list, tagged "(Private)").
     */
    @Builder.Default
    @Column(name = "donation_public", columnDefinition = "boolean default true")
    private Boolean donationPublic = true;

    @Builder.Default
    @Column(name = "two_factor_enabled", columnDefinition = "boolean default false")
    private Boolean twoFactorEnabled = false;

    @Builder.Default
    @Column(name = "notifications_enabled", columnDefinition = "boolean default true")
    private Boolean notificationsEnabled = true;

    @Builder.Default
    @Column(name = "expiry_alerts_enabled", columnDefinition = "boolean default true")
    private Boolean expiryAlertsEnabled = true;

    @Builder.Default
    @Column(name = "donation_updates_enabled", columnDefinition = "boolean default true")
    private Boolean donationUpdatesEnabled = true;

    // ── 2FA OTP fields ──────────────────────────────────────────────────────
    // - These fields are used for the 2FA OTP verification process. They are not used for regular authentication.
    /**
     * The 6-digit OTP currently pending verification (null when none).
     */
    @Column(name = "otp_code", length = 6)
    private String otpCode;

    /**
     * When the OTP expires (null when no OTP is pending).
     */
    @Column(name = "otp_expires_at")
    private Instant otpExpiresAt;

    /**
     * Whether the 2FA enable-flow has been fully confirmed. twoFactorEnabled
     * may be false while pendingTwoFactor is true (the user triggered the OTP
     * email but has not yet verified it).
     */
    @Builder.Default
    @Column(name = "pending_two_factor", columnDefinition = "boolean default false")
    private Boolean pendingTwoFactor = false;
}
