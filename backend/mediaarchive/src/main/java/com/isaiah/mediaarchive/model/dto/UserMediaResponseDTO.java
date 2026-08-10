package com.isaiah.mediaarchive.model.dto;

import com.isaiah.mediaarchive.model.enums.CollectionStatusEnum;
import com.isaiah.mediaarchive.model.enums.GenreEnum;
import com.isaiah.mediaarchive.model.enums.MediaTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Getter
@AllArgsConstructor
public class UserMediaResponseDTO {

    // Base Media fields
    private String externalId;

    private String title;

    private String description;

    private MediaTypeEnum mediaType;

    private Set<GenreEnum> genres;

    private LocalDate releaseDate;

    private BigDecimal communityRating;

    private String coverImgUrl;

    private Integer sortOrder;

    // User Media fields
    private CollectionStatusEnum status;

    private BigDecimal personalRating;

    private String notes;

    private LocalDate purchaseDate;

    private BigDecimal purchasePrice;

    private String format;

    private String condition;
}
