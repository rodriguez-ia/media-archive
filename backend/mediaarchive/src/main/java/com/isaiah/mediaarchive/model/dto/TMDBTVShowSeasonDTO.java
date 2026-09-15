package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class TMDBTVShowSeasonDTO {

    private int id;

    private String name;

    private String overview;

    private LocalDate air_date;

    private BigDecimal vote_average;

    private String poster_path;

    private int season_number;
}
