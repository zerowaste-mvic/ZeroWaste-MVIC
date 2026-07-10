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

    @Column(nullable = false)
    @Builder.Default
    private String role = "USER";

    private String gender;

    private String address;

    /**
     * Privacy setting: when true, this user's donations are visible to
     * everyone in Browse Food Item. When false, their donations are only
     * visible to themselves (still shown in their own browse list, tagged
     * "(Private)").
     */
    @Builder.Default
    @Column(name = "donation_public", columnDefinition = "boolean default true")
    private Boolean donationPublic = true;
    @Builder.Default
    @Column(name = "two_factor_enabled", columnDefinition = "boolean default true")
    private Boolean twoFactorEnabled = true;

    @Builder.Default
    @Column(name = "expiry_alerts_enabled", columnDefinition = "boolean default true")
    private Boolean expiryAlertsEnabled = true;
}