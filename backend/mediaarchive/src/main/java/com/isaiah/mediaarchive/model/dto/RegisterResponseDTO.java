package com.isaiah.mediaarchive.model.dto;

import lombok.*;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class RegisterResponseDTO {

    private UUID id;

    private String username;

    private String email;
}
