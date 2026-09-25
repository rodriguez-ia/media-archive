package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class DeleteUserMediaResponseDTO {

    private int rowsDeleted;

    private List<String> deletedUserMediaExternalIds;
}
