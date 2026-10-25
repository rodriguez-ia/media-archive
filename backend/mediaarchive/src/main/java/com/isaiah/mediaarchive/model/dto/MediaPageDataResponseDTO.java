package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MediaPageDataResponseDTO<T> {

    private String id;

    private String label;

    private String description;

    private List<T> items;
}
