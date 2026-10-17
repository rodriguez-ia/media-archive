package com.isaiah.mediaarchive.repository;

import com.isaiah.mediaarchive.model.entity.DailySpotlightEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DailySpotlightRepository extends JpaRepository<DailySpotlightEntity, UUID> {

    DailySpotlightEntity findByUserId(UUID userId);
}
