package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class GoogleBooksVolumeInfoDTO {

    private String title;

    private String description;

    private String publishedDate;

    private GoogleBooksVolumeImageLinksDTO imageLinks;
}
