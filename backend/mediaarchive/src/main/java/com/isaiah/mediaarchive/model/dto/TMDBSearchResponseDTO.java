package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class TMDBSearchResponseDTO {

    private Integer page;

    private List<TMDBResponseItemDTO> results;

    private Integer total_pages;

    private Integer total_results;
}
