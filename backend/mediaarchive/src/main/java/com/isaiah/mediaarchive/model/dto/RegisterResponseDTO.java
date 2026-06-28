package com.isaiah.mediaarchive.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterResponseDTO {

    private UUID id;

    private String username;

    private String email;
}
