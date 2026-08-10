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
    """)
    List<BaseMediaEntity> findAllByUserId(UUID userId);

    List<BaseMediaEntity> findAllByExternalIdIn(List<String> externalIds);
}
