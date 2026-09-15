package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class TMDBTVSeasonEpisodeDTO {

    public int id;

    public String name;

    public String overview;

    public int episode_number;

    public LocalDate air_date;

    public BigDecimal vote_average;

    public String still_path;
}
