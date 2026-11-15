package com.isaiah.mediaarchive.mapper;

import com.isaiah.mediaarchive.model.dto.BaseMediaResponseDTO;
import com.isaiah.mediaarchive.model.dto.IGDBResponseItemDTO;
import com.isaiah.mediaarchive.model.dto.IGDBVideoGameCoverDTO;
import com.isaiah.mediaarchive.model.enums.GenreEnum;
import com.isaiah.mediaarchive.model.enums.MediaTypeEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class IGDBMapper {

    private static final Logger log = LoggerFactory.getLogger(IGDBMapper.class);

    private static final String COVER_IMG_BASE_URL = "https://images.igdb.com/igdb/image/upload/t_cover_big/";
    private static final String IMG_FILE_EXTENSION = ".jpg";

    private static final Map<Integer, GenreEnum> GENRE_BY_IGDB_ID = Map.ofEntries(
            Map.entry(1, GenreEnum.ACTION),
            Map.entry(17, GenreEnum.FANTASY),
            Map.entry(18, GenreEnum.SCIENCE_FICTION),
            Map.entry(19, GenreEnum.HORROR),
            Map.entry(20, GenreEnum.THRILLER),
            Map.entry(22, GenreEnum.HISTORY),
            Map.entry(27, GenreEnum.COMEDY),
            Map.entry(28, GenreEnum.BUSINESS),
            Map.entry(44, GenreEnum.ROMANCE),
            Map.entry(31, GenreEnum.DRAMA),
            Map.entry(34, GenreEnum.EDUCATIONAL),
            Map.entry(35, GenreEnum.KIDS),
            Map.entry(39, GenreEnum.WAR),
            Map.entry(43, GenreEnum.MYSTERY)
    );

    public List<BaseMediaResponseDTO> igdbResponseToBaseMediaResponseDTOList(List<IGDBResponseItemDTO> responseItems) {

        log.debug("Mapping IGDB API response data to List<BaseMediaResponseDTO>...");

        List<BaseMediaResponseDTO> results = new ArrayList<>();

        if (responseItems == null || responseItems.isEmpty()) {
            log.debug("IGDB API response is null or empty");

            return results;
        }

        for (IGDBResponseItemDTO igdbResponseItem : responseItems) {

            if (igdbResponseItem.getId() == null || igdbResponseItem.getName() == null || igdbResponseItem.getName().isBlank()) {
                continue;
            }

            log.debug("Including media item '{}' in results list.", igdbResponseItem.getName());

            results.add(new BaseMediaResponseDTO(
                    igdbResponseItem.getId(),
                    igdbResponseItem.getName(),
                    igdbResponseItem.getSummary(),
                    MediaTypeEnum.VIDEO_GAME,
                    mapIGDBGenres(igdbResponseItem.getThemes()),
                    convertUnixTimestampToLocalDate(igdbResponseItem.getFirst_release_date()),
                    igdbResponseItem.getRating(),
                    buildCoverImgUrl(igdbResponseItem.getCover())
            ));
        }

        return results;
    }

    private Set<GenreEnum> mapIGDBGenres(List<Integer> genreIds) {
        if (genreIds == null) {
            return Set.of(GenreEnum.OTHER);
        }

        return genreIds.stream()
                .map(id -> GENRE_BY_IGDB_ID.getOrDefault(id, GenreEnum.OTHER))
                .collect(Collectors.toUnmodifiableSet());
    }

    private LocalDate convertUnixTimestampToLocalDate(Integer unixTimestamp) {
        if (unixTimestamp == null) {
            return null;
        }

        // Use LocalDateTime to get readable datetime from unix epoch timestamp
        LocalDateTime ldt = LocalDateTime.ofInstant(
                Instant.ofEpochSecond(unixTimestamp),
                ZoneId.systemDefault()
        );

        return ldt.toLocalDate();
    }

    private String buildCoverImgUrl(IGDBVideoGameCoverDTO coverDTO) {
        if (coverDTO == null || coverDTO.getImage_id() == null || coverDTO.getImage_id().isBlank()) {
            return null;
        }

        return COVER_IMG_BASE_URL + coverDTO.getImage_id() + IMG_FILE_EXTENSION;
    }
}
