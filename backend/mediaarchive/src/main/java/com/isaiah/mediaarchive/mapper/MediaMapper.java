package com.isaiah.mediaarchive.mapper;

import com.isaiah.mediaarchive.model.dto.AddMediaToLibraryRequestDTO;
import com.isaiah.mediaarchive.model.dto.BaseMediaResponseDTO;
import com.isaiah.mediaarchive.model.dto.UserMediaResponseDTO;
import com.isaiah.mediaarchive.model.entity.BaseMediaEntity;
import com.isaiah.mediaarchive.model.entity.UserEntity;
import com.isaiah.mediaarchive.model.entity.UserMediaEntity;
import org.springframework.stereotype.Component;

@Component
public class MediaMapper {

    public UserMediaResponseDTO userMediaEntityToUserMediaResponse(UserMediaEntity userMedia) {
        return new UserMediaResponseDTO(
                userMedia.getMediaItem().getExternalId(),
                userMedia.getMediaItem().getTitle(),
                userMedia.getMediaItem().getDescription(),
                userMedia.getMediaItem().getMediaType(),
                userMedia.getMediaItem().getGenres(),
                userMedia.getMediaItem().getReleaseDate(),
                userMedia.getMediaItem().getCommunityRating(),
                userMedia.getMediaItem().getCoverImgUrl(),
                userMedia.getMediaItem().getSortOrder(),
                userMedia.getStatus(),
                userMedia.getPersonalRating(),
                userMedia.getNotes(),
                userMedia.getPurchaseDate(),
                userMedia.getPurchasePrice(),
                userMedia.getFormat(),
                userMedia.getCondition()
        );
    }

    public UserMediaEntity baseMediaEntityAndUserEntityToUserMediaEntity(BaseMediaEntity baseMedia, UserEntity user) {
        return new UserMediaEntity(
                baseMedia,
                user
        );
    }

    public BaseMediaResponseDTO baseMediaEntityToBaseMediaResponse(BaseMediaEntity baseMedia) {
        return new BaseMediaResponseDTO(
                baseMedia.getExternalId(),
                baseMedia.getTitle(),
                baseMedia.getDescription(),
                baseMedia.getMediaType(),
                baseMedia.getGenres(),
                baseMedia.getReleaseDate(),
                baseMedia.getCommunityRating(),
                baseMedia.getCoverImgUrl(),
                baseMedia.getSortOrder()
        );
    }

    public BaseMediaEntity addMediaDTOToBaseMediaEntity(AddMediaToLibraryRequestDTO requestDTO) {
        return new BaseMediaEntity(
                requestDTO.getExternalId(),
                requestDTO.getTitle(),
                requestDTO.getDescription(),
                requestDTO.getMediaType(),
                requestDTO.getGenres(),
                requestDTO.getReleaseDate(),
                requestDTO.getCommunityRating(),
                requestDTO.getCoverImgUrl(),
                requestDTO.getSortOrder()
        );
    }
}
