package com.zerowaste.zerowaste.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ToggleRequest {

    @NotNull(message = "enabled is required.")
    private Boolean enabled;
}