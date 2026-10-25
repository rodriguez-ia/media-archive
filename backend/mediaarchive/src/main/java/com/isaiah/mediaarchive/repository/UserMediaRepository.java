package com.isaiah.mediaarchive.repository;

import com.isaiah.mediaarchive.model.dto.GenreRatingTotalDTO;
import com.isaiah.mediaarchive.model.dto.MediaSummaryResponseDTO;
import com.isaiah.mediaarchive.model.entity.UserMediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Repository
public interface UserMediaRepository extends JpaRepository<UserMediaEntity, UUID> {

    @Query("""
        SELECT DISTINCT um
        FROM UserMediaEntity um
        JOIN FETCH um.mediaItem bm
        LEFT JOIN FETCH bm.genres
        WHERE um.user.id = :userId
            AND bm.mediaType IN ('MOVIE', 'TV_SHOW', 'MUSIC_ALBUM', 'BOOK')
            AND MONTH(bm.releaseDate) = :month
            AND DAY(bm.releaseDate) = :day
    """)
    List<UserMediaEntity> findAllByUserIdAndReleaseMonthAndDay(UUID userId, int month, int day);

    @Query("""
        SELECT DISTINCT um
        FROM UserMediaEntity um
        JOIN FETCH um.mediaItem bm
        LEFT JOIN FETCH bm.genres
        WHERE um.user.id = :userId
            AND um.personalRating > 8
    """)
    List<UserMediaEntity> findAllByUserIdAndHighPersonalRating(UUID userId);

    @Query("""
    SELECT new com.isaiah.mediaarchive.model.dto.GenreRatingTotalDTO(
        g,
        SUM(um.personalRating)
        )
    FROM UserMediaEntity um
    JOIN um.mediaItem bm
    JOIN bm.genres g
    WHERE um.user.id = :userId
      AND um.personalRating IS NOT NULL
    GROUP BY g
    ORDER BY SUM(um.personalRating) DESC
    """)
    List<GenreRatingTotalDTO> findGenreRatingTotals(UUID userId);

    @Query("""
    SELECT DISTINCT um
    FROM UserMediaEntity um
    JOIN FETCH um.mediaItem bm
    JOIN FETCH bm.genres g
    WHERE um.user.id = :userId
      AND g IN :genres
    """)
    List<UserMediaEntity> findAllByUserIdAndGenres(UUID userId, Collection<String> genres);

    @Query("""
        SELECT new com.isaiah.mediaarchive.model.dto.MediaSummaryResponseDTO(
            SUM(CASE WHEN um.status = 'OWNED' AND bm.mediaType IN ('MOVIE', 'TV_SHOW', 'MUSIC_ALBUM', 'BOOK') THEN 1 ELSE 0 END),
            SUM(CASE WHEN um.status = 'OWNED' AND bm.mediaType = 'MOVIE' THEN 1 ELSE 0 END),
            SUM(CASE WHEN um.status = 'OWNED' AND bm.mediaType = 'TV_SHOW' THEN 1 ELSE 0 END),
            SUM(CASE WHEN um.status = 'OWNED' AND bm.mediaType = 'MUSIC_ALBUM' THEN 1 ELSE 0 END),
            SUM(CASE WHEN um.status = 'OWNED' AND bm.mediaType = 'BOOK' THEN 1 ELSE 0 END),
            SUM(CASE WHEN um.status = 'WISHLISTED' AND bm.mediaType IN ('MOVIE', 'TV_SHOW', 'MUSIC_ALBUM', 'BOOK') THEN 1 ELSE 0 END),
            SUM(CASE WHEN um.status = 'WISHLISTED' AND bm.mediaType = 'MOVIE' THEN 1 ELSE 0 END),
            SUM(CASE WHEN um.status = 'WISHLISTED' AND bm.mediaType = 'TV_SHOW' THEN 1 ELSE 0 END),
            SUM(CASE WHEN um.status = 'WISHLISTED' AND bm.mediaType = 'MUSIC_ALBUM' THEN 1 ELSE 0 END),
            SUM(CASE WHEN um.status = 'WISHLISTED' AND bm.mediaType = 'BOOK' THEN 1 ELSE 0 END)
            )
        FROM UserMediaEntity um
        JOIN um.mediaItem bm
        WHERE um.user.id = :userId
            AND um.status IN ('OWNED', 'WISHLISTED')
    """)
    MediaSummaryResponseDTO findAllMediaTypeCounts(UUID userId);

    @Query("""
    SELECT DISTINCT um
    FROM UserMediaEntity um
    JOIN FETCH um.mediaItem bm
    WHERE um.user.id = :userId
        AND um.personalRating >= :ratingThreshold
        AND bm.mediaType IN ('MOVIE', 'TV_SHOW')
    """)
    List<UserMediaEntity> findAllTMDBMediaByPersonalRating(UUID userId, BigDecimal ratingThreshold);

    @Query("""
        SELECT DISTINCT um
        FROM UserMediaEntity um
        JOIN FETCH um.mediaItem bm
        LEFT JOIN FETCH bm.genres
        WHERE um.user.id = :userId
            AND bm.mediaType NOT IN ('TV_SEASON', 'TV_EPISODE', 'MUSIC_TRACK')
        ORDER BY bm.title
    """)
    List<UserMediaEntity> findAllByUserId(UUID userId);

    @Modifying
    @Query("""
        DELETE FROM UserMediaEntity um
        WHERE um.user.id = :userId
        AND um.mediaItem.externalId IN :externalIds
    """)
    int deleteUserMediaByExternalIdList(UUID userId, List<String> externalIds);

    List<UserMediaEntity> findAllByUserIdAndMediaItemExternalIdIn(UUID userId, Collection<String> externalIds);

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
