package com.isaiah.mediaarchive.repository;

import com.isaiah.mediaarchive.model.entity.UserMediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserMediaRepository extends JpaRepository<UserMediaEntity, UUID> {

    @Query("""
        SELECT um
        FROM UserMediaEntity um
        JOIN FETCH um.mediaItem
        WHERE um.user.id = :userId
            AND um.mediaItem.mediaType != 'TV_SEASON'
            AND um.mediaItem.mediaType != 'TV_EPISODE'
            AND um.mediaItem.mediaType != 'MUSIC_TRACK'
        ORDER BY um.mediaItem.title
    """)
    List<UserMediaEntity> findAllByUserId(UUID userId);

    List<UserMediaEntity> findAllByUserIdAndMediaItemExternalIdIn(UUID userId, List<String> externalIds);

    UserMediaEntity findByUserIdAndMediaItemExternalId(UUID userId, String externalId);

    @Query("""
    SELECT um
    FROM UserMediaEntity um
    JOIN FETCH um.mediaItem
    WHERE um.user.id = :userId
        AND um.mediaItem.parentId = :parentId
    ORDER BY um.mediaItem.sortOrder
    """)
    List<UserMediaEntity> findAllByUserIdAndMediaItemParentId(UUID userId, UUID parentId);
}
