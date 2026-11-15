package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class IGDBTokenResponseDTO {

    private String access_token;

    private long expires_in;

    private String token_type;
}
