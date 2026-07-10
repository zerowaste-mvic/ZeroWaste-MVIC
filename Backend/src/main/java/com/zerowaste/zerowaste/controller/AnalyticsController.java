package com.zerowaste.zerowaste.controller;

import com.zerowaste.zerowaste.dto.AnalyticsSummaryResponse;
import com.zerowaste.zerowaste.dto.ChartBreakdownResponse;
import com.zerowaste.zerowaste.service.AnalyticsService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/summary")
    public AnalyticsSummaryResponse summary(
            @RequestParam(defaultValue = "month") String period,
            @AuthenticationPrincipal Long userId) {
        return analyticsService.getSummary(userId, period);
    }

    @GetMapping("/inventory-overview")
    public ChartBreakdownResponse inventoryOverview(@AuthenticationPrincipal Long userId) {
        return analyticsService.getInventoryOverview(userId);
    }

    @GetMapping("/food-saved-breakdown")
    public ChartBreakdownResponse foodSavedBreakdown(
            @RequestParam(defaultValue = "month") String period,
            @AuthenticationPrincipal Long userId) {
        return analyticsService.getFoodSavedBreakdown(userId, period);
    }
}