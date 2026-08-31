package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GoogleBooksResponseItemDTO {

    private String id;

    private GoogleBooksVolumeInfoDTO volumeInfo;
}
