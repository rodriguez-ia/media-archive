package com.isaiah.mediaarchive.mapper;

import com.isaiah.mediaarchive.model.dto.*;
import com.isaiah.mediaarchive.model.entity.BaseMediaEntity;
import com.isaiah.mediaarchive.model.enums.GenreEnum;
import com.isaiah.mediaarchive.model.enums.MediaTypeEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DeezerMapper {

    private static final Logger log = LoggerFactory.getLogger(DeezerMapper.class);

    private static final Map<Integer, GenreEnum> GENRE_BY_DEEZER_ID = Map.ofEntries(
            Map.entry(132, GenreEnum.POP),
            Map.entry(116, GenreEnum.RAP_HIP_HOP),
            Map.entry(122, GenreEnum.REGGAETON),
            Map.entry(152, GenreEnum.ROCK),
            Map.entry(113, GenreEnum.DANCE),
            Map.entry(165, GenreEnum.R_AND_B),
            Map.entry(85, GenreEnum.ALTERNATIVE),
            Map.entry(186, GenreEnum.CHRISTIAN),
            Map.entry(106, GenreEnum.ELECTRONIC),
            Map.entry(466, GenreEnum.FOLK),
            Map.entry(144, GenreEnum.REGGAE),
            Map.entry(129, GenreEnum.JAZZ),
            Map.entry(84, GenreEnum.COUNTRY),
            Map.entry(67, GenreEnum.SALSA),
            Map.entry(65, GenreEnum.OTHER),              // Traditional Mexicano
            Map.entry(98, GenreEnum.CLASSICAL),
            Map.entry(173, GenreEnum.OTHER),             // Films/Games
            Map.entry(464, GenreEnum.METAL),
            Map.entry(169, GenreEnum.SOUL_FUNK),
            Map.entry(2, GenreEnum.AFRICAN_MUSIC),
            Map.entry(16, GenreEnum.ASIAN_MUSIC),
            Map.entry(153, GenreEnum.BLUES),
            Map.entry(75, GenreEnum.BRAZILIAN_MUSIC),
            Map.entry(71, GenreEnum.CUMBIA),
            Map.entry(81, GenreEnum.INDIAN_MUSIC),
            Map.entry(95, GenreEnum.KIDS),
            Map.entry(197, GenreEnum.LATIN_MUSIC)
    );

    public List<BaseMediaEntity> deezerAlbumDetailsResponseToBaseMediaEntityList(DeezerAlbumDetailsSearchResponseDTO deezerResponse, UUID parentId) {

        log.debug("Mapping Deezer API album details response data to List<BaseMediaEntity>...");

        List<BaseMediaEntity> resultList = new ArrayList<>();

        for (DeezerAlbumTrackDTO track : deezerResponse.getData()) {

            if (track.getId() == 0 || track.getTrack_position() == 0 || track.getTitle() == null || track.getTitle().isBlank()) {
                continue;
            }

            log.debug("Including media item '{}' in MUSIC_TRACK results list.", track.getTitle());

            resultList.add(new BaseMediaEntity(
                    Integer.toString(track.getId()),
                    parentId,
                    track.getTitle(),
                    null,
                    MediaTypeEnum.MUSIC_TRACK,
                    null,
                    null,
                    null,
                    track.getPreview(),
                    track.getTrack_position()
            ));
        }

        return resultList;
    }

    public List<BaseMediaResponseDTO> deezerResponseToBaseMediaResponseDTOList(DeezerSearchResponseDTO deezerResponse) {

        log.debug("Mapping Deezer API response data to List<BaseMediaResponseDTO>...");

        List<BaseMediaResponseDTO> resultList = new ArrayList<>();

        for (DeezerResponseItemDTO deezerResponseItem : deezerResponse.getData()) {

            if (deezerResponseItem.getId() == null) {
                continue;
            }

            log.debug("Including media item '{}' in results list.", deezerResponseItem.getTitle());

            resultList.add(new BaseMediaResponseDTO(
                    deezerResponseItem.getId().toString(),
                    deezerResponseItem.getTitle(),
                    null,
                    MediaTypeEnum.MUSIC_ALBUM,
                    mapDeezerGenre(deezerResponseItem.getGenre_id()),
                    null,
                    null,
                    deezerResponseItem.getCover_big()
            ));
        }

        return resultList;
    }

    private Set<GenreEnum> mapDeezerGenre(Integer genreId) {
        if (genreId == null) {
            return Set.of(GenreEnum.OTHER);
        }

        return Set.of(GENRE_BY_DEEZER_ID.getOrDefault(genreId, GenreEnum.OTHER));
    }
}
