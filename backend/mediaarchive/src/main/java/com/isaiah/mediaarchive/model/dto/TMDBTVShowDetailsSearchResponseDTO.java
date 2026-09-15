package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class TMDBTVShowDetailsSearchResponseDTO {

    private List<TMDBTVShowSeasonDTO> seasons;

    private String status;

    private int number_of_seasons;

    private int number_of_episodes;
}
