package com.isaiah.mediaarchive.model.dto;


import com.isaiah.mediaarchive.model.enums.MediaTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MediaReferenceDTO {

    private String externalId;

    private MediaTypeEnum mediaType;
}
