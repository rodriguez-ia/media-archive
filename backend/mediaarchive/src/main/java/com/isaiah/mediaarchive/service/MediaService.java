package com.isaiah.mediaarchive.service;

import com.isaiah.mediaarchive.exception.MediaNotFoundException;
import com.isaiah.mediaarchive.mapper.MediaMapper;
import com.isaiah.mediaarchive.model.dto.MediaResponseDTO;
import com.isaiah.mediaarchive.model.entity.UserEntity;
import com.isaiah.mediaarchive.model.entity.UserMediaEntity;
import com.isaiah.mediaarchive.repository.UserMediaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MediaService {

    private final UserMediaRepository userMediaRepository;
    private final MediaMapper mediaMapper;

    private static final Logger log = LoggerFactory.getLogger(MediaService.class);

    public MediaService(UserMediaRepository userMediaRepository, MediaMapper mediaMapper) {
        this.userMediaRepository = userMediaRepository;
        this.mediaMapper = mediaMapper;
    }

    public List<MediaResponseDTO> getAllUserMedia(UserEntity user) {

        log.info("Retrieving all media items for user: username='{}'", user.getUsername());

        List<UserMediaEntity> userMediaList = userMediaRepository.findAllUserMediaByUserId(user.getId());

        if (userMediaList == null || userMediaList.isEmpty()) {
            throw new MediaNotFoundException("Unable to get user media items.");
        }

        log.debug("User media found.");

        List<MediaResponseDTO> mediaResponseList = new ArrayList<>();

        for (UserMediaEntity userMediaItem : userMediaList) {
            if (userMediaItem == null) {
                log.warn("Null user media item found.");
                continue;
            }

            mediaResponseList.add(mediaMapper.toMediaResponse(userMediaItem));
        }

        return mediaResponseList;
    }
}
