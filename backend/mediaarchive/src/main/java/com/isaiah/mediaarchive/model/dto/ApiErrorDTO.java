package com.isaiah.mediaarchive.model.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiErrorDTO {

    private String field;

    private String message;
}
