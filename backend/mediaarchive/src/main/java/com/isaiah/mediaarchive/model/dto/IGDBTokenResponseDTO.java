package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class IGDBTokenResponseDTO {

    private String accessToken;

    private long expiresIn;

    private String tokenType;
}
