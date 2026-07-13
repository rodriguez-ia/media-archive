package com.isaiah.mediaarchive.model.dto;

import com.isaiah.mediaarchive.model.entity.BaseMediaEntity;
import com.isaiah.mediaarchive.model.entity.UserEntity;
import com.isaiah.mediaarchive.model.enums.CollectionStatusEnum;
import com.isaiah.mediaarchive.model.enums.GenreEnum;
import com.isaiah.mediaarchive.model.enums.MediaTypeEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class MediaResponseDTO {

    // IDs
    private UUID baseMediaId;

    private UUID userMediaId;

    private String externalId;

    // Base Media fields
    private String title;

    private String description;

    private MediaTypeEnum mediaType;

    private Set<GenreEnum> genres;

    private LocalDate releaseDate;

    private Integer communityRating;

    private String coverImgUrl;

    private Integer sortOrder;

    // User Media fields
    private CollectionStatusEnum status;

    private Integer personalRating;

    private String notes;

    private LocalDate purchaseDate;

    private BigDecimal purchasePrice;

    private String format;

    private String condition;
}
