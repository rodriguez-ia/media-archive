package com.isaiah.mediaarchive.service;

import com.isaiah.mediaarchive.exception.MediaNotFoundException;
import com.isaiah.mediaarchive.mapper.MediaMapper;
import com.isaiah.mediaarchive.model.dto.BaseMediaResponseDTO;
import com.isaiah.mediaarchive.model.dto.UserMediaResponseDTO;
import com.isaiah.mediaarchive.model.entity.BaseMediaEntity;
import com.isaiah.mediaarchive.model.entity.UserEntity;
import com.isaiah.mediaarchive.model.entity.UserMediaEntity;
import com.isaiah.mediaarchive.repository.BaseMediaRepository;
import com.isaiah.mediaarchive.repository.UserMediaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MediaService {

    private final UserMediaRepository userMediaRepository;
    private final BaseMediaRepository baseMediaRepository;
    private final MediaMapper mediaMapper;

    private static final Logger log = LoggerFactory.getLogger(MediaService.class);

    public MediaService(UserMediaRepository userMediaRepository,
                        BaseMediaRepository baseMediaRepository,
                        MediaMapper mediaMapper) {
        this.userMediaRepository = userMediaRepository;
        this.baseMediaRepository = baseMediaRepository;
        this.mediaMapper = mediaMapper;
    }

    public List<UserMediaResponseDTO> getAllUserMedia(UserEntity user) {

        log.info("Retrieving all USER media items for user: username='{}'", user.getUsername());

        List<UserMediaEntity> userMediaList = userMediaRepository.findAllByUserId(user.getId());

        if (userMediaList == null || userMediaList.isEmpty()) {
            throw new MediaNotFoundException("Unable to get user media items.");
        }

        log.debug("User media found.");

        List<UserMediaResponseDTO> userMediaResponseList = new ArrayList<>();

        for (UserMediaEntity userMediaItem : userMediaList) {
            if (userMediaItem == null) {
                log.warn("Null user media item found.");
                continue;
            }

            userMediaResponseList.add(mediaMapper.toUserMediaResponse(userMediaItem));
        }

        return userMediaResponseList;
    }

    public List<BaseMediaResponseDTO> getAllBaseMediaForUser(UserEntity user) {

        log.info("Retrieving all BASE media items for user: username='{}'", user.getUsername());

        List<BaseMediaEntity> baseMediaList = baseMediaRepository.findAllByUserId(user.getId());

        if (baseMediaList == null) {
            throw new MediaNotFoundException("Unable to get base media items for user.");
        }

        log.debug("Base media found for user.");

        List<BaseMediaResponseDTO> baseMediaResponseList = new ArrayList<>();

        for (BaseMediaEntity baseMediaItem : baseMediaList) {
            if (baseMediaItem == null) {
                log.warn("Null base media item found for user.");
                continue;
            }

            baseMediaResponseList.add(mediaMapper.toBaseMediaResponse(baseMediaItem));
        }

        return baseMediaResponseList;
    }
}
