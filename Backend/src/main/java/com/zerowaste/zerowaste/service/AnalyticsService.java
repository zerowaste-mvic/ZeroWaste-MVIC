package com.zerowaste.zerowaste.service;

import com.zerowaste.zerowaste.dto.AnalyticsSummaryResponse;
import com.zerowaste.zerowaste.dto.CategoryBreakdownResponse;
import com.zerowaste.zerowaste.dto.ChartBreakdownResponse;
import com.zerowaste.zerowaste.model.FoodActivityLog;
import com.zerowaste.zerowaste.model.FoodItem;
import com.zerowaste.zerowaste.repository.FoodActivityLogRepository;
import com.zerowaste.zerowaste.repository.FoodItemRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    // Matches FoodItemService.ALLOWED_CATEGORIES; kept in this display order
    // so every chart always shows all four categories, even at 0%.
    private static final List<String> CATEGORY_ORDER = List.of("Vegetable", "Fruits", "Meat", "Dairy");

    private final FoodActivityLogRepository activityLogRepository;
    private final FoodItemRepository foodItemRepository;

    public AnalyticsService(FoodActivityLogRepository activityLogRepository, FoodItemRepository foodItemRepository) {
        this.activityLogRepository = activityLogRepository;
        this.foodItemRepository = foodItemRepository;
    }

    public AnalyticsSummaryResponse getSummary(Long userId, String period) {
        Instant since = startOfPeriod(period);

        long used = activityLogRepository.findByUserIdAndTypeAndOccurredAtGreaterThanEqual(userId, "USED", since).size();
        long donated = activityLogRepository.findByUserIdAndTypeAndOccurredAtGreaterThanEqual(userId, "DONATED", since).size();
        long wasted = activityLogRepository.findByUserIdAndTypeAndOccurredAtGreaterThanEqual(userId, "WASTED", since).size();

        long saved = used + donated;
        long denominator = saved + wasted;
        int wasteReducedPercent = denominator == 0 ? 0 : (int) Math.round(saved * 100.0 / denominator);

        return new AnalyticsSummaryResponse(used, donated, wasteReducedPercent, normalizePeriod(period));
    }

    /**
     * Live snapshot of what's currently sitting in the user's Food
     * Inventory, grouped by category — not filtered by period, since it
     * reflects "right now", not history.
     */
    public ChartBreakdownResponse getInventoryOverview(Long userId) {
        List<String> categories = foodItemRepository.findByUserIdOrderByExpiryDateAsc(userId).stream()
                .filter(item -> !Boolean.TRUE.equals(item.getDonated()))
                .map(FoodItem::getCategory)
                .toList();
        return buildBreakdown(categories);
    }

    /**
     * Category breakdown of items marked "Used" within the selected period —
     * this is what backs the Food Saved bar chart.
     */
    public ChartBreakdownResponse getFoodSavedBreakdown(Long userId, String period) {
        Instant since = startOfPeriod(period);
        List<String> categories = activityLogRepository
                .findByUserIdAndTypeAndOccurredAtGreaterThanEqual(userId, "USED", since).stream()
                .map(FoodActivityLog::getCategory)
                .filter(Objects::nonNull)
                .toList();
        return buildBreakdown(categories);
    }

    private ChartBreakdownResponse buildBreakdown(List<String> categories) {
        Map<String, Long> counts = categories.stream()
                .collect(Collectors.groupingBy(c -> c, Collectors.counting()));
        long total = categories.size();

        List<CategoryBreakdownResponse> breakdown = CATEGORY_ORDER.stream()
                .map(cat -> {
                    long count = counts.getOrDefault(cat, 0L);
                    int percent = total == 0 ? 0 : (int) Math.round(count * 100.0 / total);
                    return new CategoryBreakdownResponse(cat, count, percent);
                })
                .toList();

        return new ChartBreakdownResponse(breakdown, total);
    }

    private Instant startOfPeriod(String period) {
        LocalDate today = LocalDate.now();
        LocalDate start = "year".equalsIgnoreCase(period) ? today.withDayOfYear(1) : today.withDayOfMonth(1);
        return start.atStartOfDay(ZoneId.systemDefault()).toInstant();
    }

    private String normalizePeriod(String period) {
        return "year".equalsIgnoreCase(period) ? "year" : "month";
    }
}