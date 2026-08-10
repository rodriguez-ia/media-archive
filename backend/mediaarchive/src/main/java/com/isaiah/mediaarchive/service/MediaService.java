package com.isaiah.mediaarchive.service;

import com.isaiah.mediaarchive.exception.MediaNotFoundException;
import com.isaiah.mediaarchive.mapper.MediaMapper;
import com.isaiah.mediaarchive.model.dto.AddMediaToLibraryRequestDTO;
import com.isaiah.mediaarchive.model.dto.BaseMediaResponseDTO;
import com.isaiah.mediaarchive.model.dto.UserMediaResponseDTO;
import com.isaiah.mediaarchive.model.entity.BaseMediaEntity;
import com.isaiah.mediaarchive.model.entity.UserEntity;
import com.isaiah.mediaarchive.model.entity.UserMediaEntity;
import com.isaiah.mediaarchive.repository.BaseMediaRepository;
import com.isaiah.mediaarchive.repository.UserMediaRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

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

    public List<UserMediaResponseDTO> getAllFromUserLibrary(UserEntity user) {

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

            userMediaResponseList.add(mediaMapper.userMediaEntityToUserMediaResponse(userMediaItem));
        }

        return userMediaResponseList;
    }

    @Transactional
    public List<UserMediaResponseDTO> addToUserLibrary(UserEntity user, List<AddMediaToLibraryRequestDTO> mediaList) {

        log.info("Adding media items to user library: username='{}'", user.getUsername());

        List<String> externalIds = mediaList.stream()
                .map(AddMediaToLibraryRequestDTO::getExternalId)
                .toList();

        log.debug("Checking if BaseMediaItem exists for each item in media list.");

        List<BaseMediaEntity> existingBaseMediaList = baseMediaRepository.findAllByExternalIdIn(externalIds);
        Map<String, BaseMediaEntity> baseMediaByExternalId =
                existingBaseMediaList.stream()
                        .collect(Collectors.toMap(
                                BaseMediaEntity::getExternalId,
                                Function.identity()
                        ));

        List<BaseMediaEntity> newBaseMediaList = new ArrayList<>();

        for (AddMediaToLibraryRequestDTO mediaItem : mediaList) {
            if (baseMediaByExternalId.containsKey(mediaItem.getExternalId())) {
                continue;
            }

            log.debug("BaseMediaEntity not found for '{}'. Adding new item with externalId='{}'", mediaItem.getTitle(), mediaItem.getExternalId());

            BaseMediaEntity newBaseMediaItem = mediaMapper.addMediaDTOToBaseMediaEntity(mediaItem);
            newBaseMediaList.add(newBaseMediaItem);

            // Add to baseMediaByExternalId for future reference and duplicate protection
            baseMediaByExternalId.put(mediaItem.getExternalId(), newBaseMediaItem);
        }

        // Save new base media items
        baseMediaRepository.saveAll(newBaseMediaList);

        log.debug("Checking if UserMediaItem exists for each item in media list.");

        List<UserMediaEntity> existingUserMediaList = userMediaRepository.findAllByUserIdAndMediaItemExternalIdIn(user.getId(), externalIds);
        Map<String, UserMediaEntity> userMediaByExternalId =
                existingUserMediaList.stream()
                        .collect(Collectors.toMap(
                                userMedia -> userMedia.getMediaItem().getExternalId(),
                                Function.identity()
                        ));

        List<UserMediaEntity> newUserMediaList = new ArrayList<>();
        List<UserMediaResponseDTO> newUserMediaResponseList = new ArrayList<>();

        for (AddMediaToLibraryRequestDTO mediaItem : mediaList) {
            if (userMediaByExternalId.containsKey(mediaItem.getExternalId())) {
                continue;
            }

            log.debug("UserMediaEntity not found for '{}'. Adding new item with externalId='{}' to username='{}'", mediaItem.getTitle(), mediaItem.getExternalId(), user.getUsername());

            BaseMediaEntity relatedBaseMediaItem = baseMediaByExternalId.get(mediaItem.getExternalId());
            UserMediaEntity newUserMediaItem = mediaMapper.baseMediaEntityAndUserEntityToUserMediaEntity(relatedBaseMediaItem, user);
            newUserMediaList.add(newUserMediaItem);

            // Add to userMediaByExternalId for duplicate protection
            userMediaByExternalId.put(mediaItem.getExternalId(), newUserMediaItem);

            // Add to newUserMediaResponseList for return
            newUserMediaResponseList.add(mediaMapper.userMediaEntityToUserMediaResponse(newUserMediaItem));
        }

        // Save new user media items
        userMediaRepository.saveAll(newUserMediaList);

        return newUserMediaResponseList;
    }

    public List<BaseMediaResponseDTO> getFromCatalog(UserEntity user) {

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

            baseMediaResponseList.add(mediaMapper.baseMediaEntityToBaseMediaResponse(baseMediaItem));
        }

        return baseMediaResponseList;
    }
}
