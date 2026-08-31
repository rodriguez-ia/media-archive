package com.isaiah.mediaarchive.model.dto;

import com.isaiah.mediaarchive.model.enums.MediaTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
public class TMDBResponseItemDTO {

    private Integer id;

    private String title;

    private String name;

    private String overview;

    private String poster_path;

    private String media_type;

    private List<Integer> genre_ids;

    private LocalDate release_date;

    private LocalDate first_air_date;

    private BigDecimal vote_average;

    private BigDecimal vote_count;

    public String getDisplayTitle() {
        return "movie".equals(media_type) ? title : name;
    }

    public LocalDate getDisplayReleaseDate() {
        return "movie".equals(media_type) ? release_date : first_air_date;
    }

    public MediaTypeEnum getDisplayMediaType() {
        return "movie".equals(media_type) ? MediaTypeEnum.MOVIE : MediaTypeEnum.TV_SHOW;
    }
}
