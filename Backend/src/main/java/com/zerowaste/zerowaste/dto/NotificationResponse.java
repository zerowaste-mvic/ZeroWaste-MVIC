package com.zerowaste.zerowaste.dto;

import com.zerowaste.zerowaste.model.Notification;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;

@Getter
@AllArgsConstructor
public class NotificationResponse {
    private Long id;
    private String type;
    private String category;
    private String title;
    private String message;
    private Boolean read;
    private Boolean resolved;
    private Long claimRequestId;
    private String requesterName;
    private String itemName;
    private Instant createdAt;

    public static NotificationResponse from(Notification n) {
        return new NotificationResponse(
                n.getId(),
                n.getType(),
                n.getCategory(),
                n.getTitle(),
                n.getMessage(),
                n.getRead(),
                n.getResolved(),
                n.getClaimRequestId(),
                n.getRequesterName(),
                n.getItemName(),
                n.getCreatedAt()
        );
    }
}