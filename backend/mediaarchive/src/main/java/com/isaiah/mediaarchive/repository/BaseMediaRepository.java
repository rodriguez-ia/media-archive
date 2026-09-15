package com.isaiah.mediaarchive.repository;

import com.isaiah.mediaarchive.model.entity.BaseMediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface BaseMediaRepository extends JpaRepository<BaseMediaEntity, UUID> {

    @Query("""
        SELECT um.mediaItem
        FROM UserMediaEntity um
        WHERE um.user.id = :userId
            AND um.mediaItem.mediaType != 'TV_SEASON'
            AND um.mediaItem.mediaType != 'TV_EPISODE'
            AND um.mediaItem.mediaType != 'MUSIC_TRACK'
    """)
    List<BaseMediaEntity> findAllByUserId(UUID userId);

    List<BaseMediaEntity> findAllByExternalIdIn(List<String> externalIds);

    @Query("""
        SELECT bm
        FROM BaseMediaEntity bm
        WHERE bm.externalId = :externalId
    """)
    BaseMediaEntity findByExternalId(String externalId);

    List<BaseMediaEntity> findAllByParentId(UUID parentId);
}
