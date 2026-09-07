package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class GoogleBooksVolumeInfoDTO {

    private String title;

    private String description;

    private String publishedDate;

    private List<String> categories;

    private GoogleBooksVolumeImageLinksDTO imageLinks;
}
