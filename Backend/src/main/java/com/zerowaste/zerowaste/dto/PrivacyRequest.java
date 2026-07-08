package com.zerowaste.zerowaste.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrivacyRequest {

    @NotNull(message = "donationPublic is required.")
    private Boolean donationPublic;
}