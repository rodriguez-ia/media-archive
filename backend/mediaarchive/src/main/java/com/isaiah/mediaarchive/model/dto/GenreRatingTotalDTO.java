package com.isaiah.mediaarchive.model.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class GenreRatingTotalDTO {

    private String genre;

    private BigDecimal ratingTotal;
}
