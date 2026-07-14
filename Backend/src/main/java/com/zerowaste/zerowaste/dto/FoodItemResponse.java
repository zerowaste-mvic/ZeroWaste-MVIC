package com.zerowaste.zerowaste.dto;

import com.zerowaste.zerowaste.model.FoodItem;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class FoodItemResponse {
    private Long id;
    private String name;
    private String category;
    private Double quantity;
    private String quantityUnit;
    private LocalDate expiryDate;
    private String imageUrl;
    private Boolean donated;
    private String donorName;
    private String pickupLocation;
    private String availableTime;
    private String contactDetail;
    private Boolean isOwn;
    private Boolean donorPublic;

    // Browse-only: true if the current viewer already has a pending claim
    // request on this item, so the frontend can show "Request Pending"
    // instead of letting them request the same item twice.
    private Boolean alreadyRequestedByMe;

    public static FoodItemResponse from(FoodItem item) {
        return from(item, null, false, null, false);
    }

    public static FoodItemResponse from(FoodItem item, String donorName) {
        return from(item, donorName, false, null, false);
    }

    public static FoodItemResponse from(FoodItem item, String donorName, boolean isOwn, Boolean donorPublic, boolean alreadyRequestedByMe) {
        return new FoodItemResponse(
                item.getId(),
                item.getName(),
                item.getCategory(),
                item.getQuantity(),
                item.getQuantityUnit(),
                item.getExpiryDate(),
                item.getImageUrl(),
                item.getDonated(),
                donorName,
                item.getPickupLocation(),
                item.getAvailableTime(),
                item.getContactDetail(),
                isOwn,
                donorPublic,
                alreadyRequestedByMe
        );
    }
}