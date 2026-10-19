package com.isaiah.mediaarchive.model.dto;


import com.isaiah.mediaarchive.model.enums.GenreEnum;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class GenreRatingTotalDTO {

    private String genre;

    private BigDecimal ratingTotal;

    public GenreRatingTotalDTO(GenreEnum genre, BigDecimal ratingTotal) {
        this.genre = genre.name();
        this.ratingTotal = ratingTotal;
    }
}
