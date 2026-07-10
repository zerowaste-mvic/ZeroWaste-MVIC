package com.zerowaste.zerowaste.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ChartBreakdownResponse {
    private List<CategoryBreakdownResponse> breakdown;
    private long totalItems;
}