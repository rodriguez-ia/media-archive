package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class GoogleBooksSearchResponseDTO {

    private String kind;

    private Integer totalItems;

    private List<GoogleBooksResponseItemDTO> items;
}
