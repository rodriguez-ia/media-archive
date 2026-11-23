package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@AllArgsConstructor
public class IGDBResponseItemDTO {

    private String id;

    private String name;

    private String storyline;

    private String summary;

    private List<Integer> themes;

    private Integer first_release_date;

    private BigDecimal rating;

    private IGDBVideoGameCoverDTO cover;
}
