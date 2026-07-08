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

    // Browse-only metadata: whether the viewer is the item's own donor, and
    // whether that donor currently has their donations set to public. The
    // frontend uses these to show a "(Public)"/"(Private)" tag next to the
    // donor's own listings so they can tell their donations apart from
    // everyone else's — this tag is never shown to other viewers.
    private Boolean isOwn;
    private Boolean donorPublic;

    public static FoodItemResponse from(FoodItem item) {
        return from(item, null, false, null);
    }

    public static FoodItemResponse from(FoodItem item, String donorName) {
        return from(item, donorName, false, null);
    }

    public static FoodItemResponse from(FoodItem item, String donorName, boolean isOwn, Boolean donorPublic) {
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
                donorPublic
        );
    }
}