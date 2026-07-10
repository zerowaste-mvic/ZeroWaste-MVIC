package com.zerowaste.zerowaste.repository;

import com.zerowaste.zerowaste.model.FoodActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface FoodActivityLogRepository extends JpaRepository<FoodActivityLog, Long> {
    List<FoodActivityLog> findByUserIdAndTypeAndOccurredAtGreaterThanEqual(Long userId, String type, Instant since);
}