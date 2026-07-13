package com.zerowaste.zerowaste.repository;

import com.zerowaste.zerowaste.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByUserIdOrderByExpiryDateAsc(Long userId);
    List<FoodItem> findByDonatedTrueAndUserIdNotOrderByExpiryDateAsc(Long userId);
    List<FoodItem> findByDonatedTrueOrderByExpiryDateAsc();
    Optional<FoodItem> findByIdAndUserId(Long id, Long userId);

    // Distinct lists for filters
    @org.springframework.data.jpa.repository.Query("select distinct f.category from FoodItem f where f.category is not null")
    java.util.List<String> findDistinctCategories();

    @org.springframework.data.jpa.repository.Query("select distinct f.storage from FoodItem f where f.storage is not null")
    java.util.List<String> findDistinctStorages();
}