package com.zerowaste.zerowaste.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommunityImpactResponse {

    private long foodSavedCount;
    private long activeHouseholds;
    private long mealsSharedCount;
}
