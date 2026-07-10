package com.zerowaste.zerowaste.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Recipient of this notification.
    @Column(nullable = false)
    private Long userId;

    // DONATION_REQUEST, DONATION_ACCEPTED, DONATION_DECLINED,
    // PRIVACY_PUBLIC, PRIVACY_PRIVATE, EXPIRY_ALERTS_ON, EXPIRY_ALERTS_OFF,
    // TWO_FACTOR_ON, TWO_FACTOR_OFF
    @Column(nullable = false)
    private String type;

    // Alerts, Donations, Reminders, System — matches the filter tabs on the
    // Notifications page.
    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 1000)
    private String message;

    @Builder.Default
    @Column(nullable = false)
    private Boolean read = false;

    // Set only on DONATION_REQUEST notifications so the donor's Accept/Decline
    // buttons know which DonationClaimRequest to act on.
    private Long claimRequestId;

    // Snapshot fields so the Accept/Decline card can be rendered without an
    // extra lookup — who asked, and for what item.
    private String requesterName;
    private String itemName;

    // For DONATION_REQUEST notifications: true once the donor has accepted or
    // declined it (so the buttons stop being shown). Always true for
    // non-actionable notification types.
    @Builder.Default
    @Column(nullable = false)
    private Boolean resolved = false;

    @Column(nullable = false)
    private Instant createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }
}