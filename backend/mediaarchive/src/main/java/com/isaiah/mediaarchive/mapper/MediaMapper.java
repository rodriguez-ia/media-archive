package com.isaiah.mediaarchive.mapper;

import com.isaiah.mediaarchive.model.dto.BaseMediaResponseDTO;
import com.isaiah.mediaarchive.model.dto.UserMediaResponseDTO;
import com.isaiah.mediaarchive.model.entity.BaseMediaEntity;
import com.isaiah.mediaarchive.model.entity.UserMediaEntity;
import org.springframework.stereotype.Component;

@Component
public class MediaMapper {

    public UserMediaResponseDTO toUserMediaResponse(UserMediaEntity userMedia) {
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

    public BaseMediaResponseDTO toBaseMediaResponse(BaseMediaEntity baseMedia) {
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
}
