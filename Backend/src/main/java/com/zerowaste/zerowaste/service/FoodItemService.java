package com.zerowaste.zerowaste.service;

import com.zerowaste.zerowaste.dto.DonateRequest;
import com.zerowaste.zerowaste.dto.FoodItemRequest;
import com.zerowaste.zerowaste.dto.FoodItemResponse;
import com.zerowaste.zerowaste.exception.ApiException;
import com.zerowaste.zerowaste.model.FoodItem;
import com.zerowaste.zerowaste.model.User;
import com.zerowaste.zerowaste.repository.FoodItemRepository;
import com.zerowaste.zerowaste.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class FoodItemService {

    private static final Set<String> ALLOWED_CATEGORIES = Set.of("Dairy", "Meat", "Fruits", "Vegetable");
    private static final Set<String> ALLOWED_UNITS = Set.of("Kg", "Ltr");

    private final FoodItemRepository foodItemRepository;
    private final UserRepository userRepository;

    public FoodItemService(FoodItemRepository foodItemRepository, UserRepository userRepository) {
        this.foodItemRepository = foodItemRepository;
        this.userRepository = userRepository;
    }

    public List<FoodItemResponse> getAllForUser(Long userId) {
        return foodItemRepository.findByUserIdOrderByExpiryDateAsc(userId).stream()
                .filter(item -> !Boolean.TRUE.equals(item.getDonated()))
                .map(FoodItemResponse::from)
                .toList();
    }

    public List<FoodItemResponse> getAvailableForBrowse(Long userId) {
        List<FoodItem> donatedItems = foodItemRepository.findByDonatedTrueOrderByExpiryDateAsc();
        if (donatedItems.isEmpty()) {
            return List.of();
        }

        Set<Long> donorIds = donatedItems.stream()
                .map(FoodItem::getUserId)
                .collect(Collectors.toSet());
        Map<Long, User> donorsById = userRepository.findAllById(donorIds).stream()
                .collect(Collectors.toMap(User::getId, u -> u));

        return donatedItems.stream()
                .filter(item -> {
                    boolean isOwn = item.getUserId().equals(userId);
                    if (isOwn) {
                        return true; // donors always see their own donations
                    }
                    User donor = donorsById.get(item.getUserId());
                    return donor != null && Boolean.TRUE.equals(donor.getDonationPublic());
                })
                .map(item -> {
                    boolean isOwn = item.getUserId().equals(userId);
                    User donor = donorsById.get(item.getUserId());
                    String donorName = donor != null ? donor.getFullName() : "Anonymous";
                    Boolean donorPublic = donor != null ? donor.getDonationPublic() : null;
                    return FoodItemResponse.from(item, donorName, isOwn, donorPublic);
                })
                .toList();
    }

    public FoodItemResponse create(FoodItemRequest request, Long userId) {
        validateCategory(request.getCategory());
        validateUnit(request.getQuantityUnit());

        FoodItem item = FoodItem.builder()
                .name(request.getName().trim())
                .category(request.getCategory())
                .quantity(request.getQuantity())
                .quantityUnit(request.getQuantityUnit())
                .expiryDate(request.getExpiryDate())
                .imageUrl(blankToNull(request.getImageUrl()))
                .userId(userId)
                .build();

        return FoodItemResponse.from(foodItemRepository.save(item));
    }

    public FoodItemResponse update(Long id, FoodItemRequest request, Long userId) {
        validateCategory(request.getCategory());
        validateUnit(request.getQuantityUnit());

        FoodItem item = foodItemRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ApiException("Food item not found.", HttpStatus.NOT_FOUND));

        item.setName(request.getName().trim());
        item.setCategory(request.getCategory());
        item.setQuantity(request.getQuantity());
        item.setQuantityUnit(request.getQuantityUnit());
        item.setExpiryDate(request.getExpiryDate());
        item.setImageUrl(blankToNull(request.getImageUrl()));

        return FoodItemResponse.from(foodItemRepository.save(item));
    }

    public FoodItemResponse donate(Long id, Long userId, DonateRequest request) {
        FoodItem item = foodItemRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ApiException("Food item not found.", HttpStatus.NOT_FOUND));

        item.setDonated(true);

        if (request != null) {
            item.setPickupLocation(blankToNull(request.getLocation()));
            item.setAvailableTime(blankToNull(request.getAvailableTime()));
            item.setContactDetail(blankToNull(request.getContactDetail()));
        }

        return FoodItemResponse.from(foodItemRepository.save(item));
    }

    /**
     * Claiming a donated item transfers it into the claimer's own Food Inventory:
     * ownership (userId) moves to the claimer and the donated flag is cleared so
     * it shows up under their "Food Inventory" / getAllForUser(...) list, and
     * disappears from everyone else's Browse Food Item list.
     */
    public FoodItemResponse claim(Long id, Long claimingUserId) {
        FoodItem item = foodItemRepository.findById(id)
                .orElseThrow(() -> new ApiException("Food item not found.", HttpStatus.NOT_FOUND));

        if (!Boolean.TRUE.equals(item.getDonated())) {
            throw new ApiException("This item is not available for claiming.", HttpStatus.BAD_REQUEST);
        }

        if (item.getUserId().equals(claimingUserId)) {
            throw new ApiException("You cannot claim your own donation.", HttpStatus.BAD_REQUEST);
        }

        User donor = userRepository.findById(item.getUserId()).orElse(null);
        if (donor == null || !Boolean.TRUE.equals(donor.getDonationPublic())) {
            throw new ApiException("This item is not available for claiming.", HttpStatus.BAD_REQUEST);
        }

        item.setUserId(claimingUserId);
        item.setDonated(false);
        item.setPickupLocation(null);
        item.setAvailableTime(null);
        item.setContactDetail(null);

        return FoodItemResponse.from(foodItemRepository.save(item));
    }

    public void delete(Long id, Long userId) {
        FoodItem item = foodItemRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ApiException("Food item not found.", HttpStatus.NOT_FOUND));
        foodItemRepository.delete(item);
    }

    private void validateCategory(String category) {
        if (!ALLOWED_CATEGORIES.contains(category)) {
            throw new ApiException("Invalid category.", HttpStatus.BAD_REQUEST);
        }
    }

    private void validateUnit(String unit) {
        if (!ALLOWED_UNITS.contains(unit)) {
            throw new ApiException("Invalid quantity unit.", HttpStatus.BAD_REQUEST);
        }
    }

    private String blankToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}