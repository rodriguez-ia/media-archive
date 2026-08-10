package com.isaiah.mediaarchive.model.dto;

import com.isaiah.mediaarchive.model.enums.GenreEnum;
import com.isaiah.mediaarchive.model.enums.MediaTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@AllArgsConstructor
public class BaseMediaResponseDTO {

    private String externalId;

    private String title;

    private String description;

    private MediaTypeEnum mediaType;

    private Set<GenreEnum> genres;

    private LocalDate releaseDate;

    private Integer communityRating;

    private String coverImgUrl;

    private Integer sortOrder;
}
