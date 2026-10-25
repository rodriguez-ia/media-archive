package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class DashboardPersonalResponseDTO {

    private List<MediaPageDataResponseDTO<UserMediaResponseDTO>> mediaPages;

    private MediaPageDataResponseDTO<GenreRatingTotalDTO> genresPage;
}
