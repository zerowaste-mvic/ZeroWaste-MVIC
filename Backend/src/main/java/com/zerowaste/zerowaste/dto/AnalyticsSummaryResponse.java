package com.zerowaste.zerowaste.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AnalyticsSummaryResponse {
    private long foodSavedCount;
    private long donationsMadeCount;
    private int wasteReducedPercent;
    private String period;
}