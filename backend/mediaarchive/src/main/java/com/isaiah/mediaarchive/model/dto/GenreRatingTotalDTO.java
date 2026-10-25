package com.isaiah.mediaarchive.model.dto;


import com.isaiah.mediaarchive.model.enums.GenreEnum;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class GenreRatingTotalDTO {

    private String genre;

    private BigDecimal ratingTotal;

    private Long viewsTotal;

    public GenreRatingTotalDTO(
            GenreEnum genre,
            BigDecimal ratingTotal,
            Long viewsTotal
    ) {
        this.genre = genre.name();
        this.ratingTotal = ratingTotal;
        this.viewsTotal = viewsTotal;
    }
}
