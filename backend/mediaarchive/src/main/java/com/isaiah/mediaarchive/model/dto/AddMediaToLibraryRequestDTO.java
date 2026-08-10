package com.isaiah.mediaarchive.model.dto;

import com.isaiah.mediaarchive.model.enums.GenreEnum;
import com.isaiah.mediaarchive.model.enums.MediaTypeEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class AddMediaToLibraryRequestDTO {

    @NotBlank
    private String externalId;

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private MediaTypeEnum mediaType;

    private Set<GenreEnum> genres;

    private LocalDate releaseDate;

    private BigDecimal communityRating;

    private String coverImgUrl;

    private Integer sortOrder;
}
