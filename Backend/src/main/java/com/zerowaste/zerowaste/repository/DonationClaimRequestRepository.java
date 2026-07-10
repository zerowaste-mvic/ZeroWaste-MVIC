package com.zerowaste.zerowaste.repository;

import com.zerowaste.zerowaste.model.DonationClaimRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface DonationClaimRequestRepository extends JpaRepository<DonationClaimRequest, Long> {
    Optional<DonationClaimRequest> findByFoodItemIdAndRequesterIdAndStatus(Long foodItemId, Long requesterId, String status);
    List<DonationClaimRequest> findByFoodItemIdAndStatus(Long foodItemId, String status);
    List<DonationClaimRequest> findByFoodItemIdInAndRequesterIdAndStatus(Collection<Long> foodItemIds, Long requesterId, String status);
}