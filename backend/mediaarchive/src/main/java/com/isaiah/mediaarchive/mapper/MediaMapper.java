package com.isaiah.mediaarchive.mapper;

import com.isaiah.mediaarchive.model.dto.MediaResponseDTO;
import com.isaiah.mediaarchive.model.entity.BaseMediaEntity;
import com.isaiah.mediaarchive.model.entity.UserMediaEntity;
import org.springframework.stereotype.Component;

@Component
public class MediaMapper {

    public MediaResponseDTO toMediaResponse(UserMediaEntity userMedia) {
        return new MediaResponseDTO(
                userMedia.getMediaItem().getId(),
                userMedia.getId(),
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
}
