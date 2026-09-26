package com.isaiah.mediaarchive.model.dto;

import com.isaiah.mediaarchive.model.enums.MediaTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DeleteUserMediaRequestDTO {

    private MediaTypeEnum mediaType;

    private String externalId;
}
