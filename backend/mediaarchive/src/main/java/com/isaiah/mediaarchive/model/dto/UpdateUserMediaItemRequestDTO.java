package com.isaiah.mediaarchive.model.dto;

import com.isaiah.mediaarchive.model.enums.CollectionStatusEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class UpdateUserMediaItemRequestDTO {

    private int consumptionCount;

    private BigDecimal personalRating;

    private LocalDate purchaseDate;

    private BigDecimal purchasePrice;

    private CollectionStatusEnum status;

    private String format;

    private String condition;

    private String notes;
}
