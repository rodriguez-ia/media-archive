package com.isaiah.mediaarchive.mapper;

import com.isaiah.mediaarchive.model.dto.BaseMediaResponseDTO;
import com.isaiah.mediaarchive.model.dto.TMDBResponseItemDTO;
import com.isaiah.mediaarchive.model.dto.TMDBSearchResponseDTO;
import com.isaiah.mediaarchive.model.enums.GenreEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class TMDBMapper {

    private static final Logger log = LoggerFactory.getLogger(TMDBMapper.class);

    private static final String COVER_IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
    private static final String MOVIE = "movie";
    private static final String TV = "tv";

    private static final Map<Integer, GenreEnum> GENRE_BY_TMDB_ID = Map.ofEntries(
            Map.entry(28, GenreEnum.ACTION),
            Map.entry(12, GenreEnum.ADVENTURE),
            Map.entry(16, GenreEnum.ANIMATION),
            Map.entry(35, GenreEnum.COMEDY),
            Map.entry(80, GenreEnum.CRIME),
            Map.entry(99, GenreEnum.DOCUMENTARY),
            Map.entry(18, GenreEnum.DRAMA),
            Map.entry(10751, GenreEnum.FAMILY),
            Map.entry(14, GenreEnum.FANTASY),
            Map.entry(36, GenreEnum.HISTORY),
            Map.entry(27, GenreEnum.HORROR),
            Map.entry(10402, GenreEnum.MUSIC),
            Map.entry(9648, GenreEnum.MYSTERY),
            Map.entry(10759, GenreEnum.ACTION_ADVENTURE),
            Map.entry(10762, GenreEnum.KIDS),
            Map.entry(10763, GenreEnum.NEWS),
            Map.entry(10764, GenreEnum.REALITY),
            Map.entry(10765, GenreEnum.SCI_FI_FANTASY),
            Map.entry(10766, GenreEnum.SOAP),
            Map.entry(10767, GenreEnum.TALK),
            Map.entry(10749, GenreEnum.ROMANCE),
            Map.entry(878, GenreEnum.SCIENCE_FICTION),
            Map.entry(10770, GenreEnum.TV_MOVIE),
            Map.entry(53, GenreEnum.THRILLER),
            Map.entry(10752, GenreEnum.WAR),
            Map.entry(10768, GenreEnum.WAR_POLITICS),
            Map.entry(37, GenreEnum.WESTERN)
    );

    public List<BaseMediaResponseDTO> tmdbResponseToBaseMediaResponseDTOList(TMDBSearchResponseDTO tmdbResponse) {

        log.debug("Mapping TMDB API response data to BaseMediaResponseDTO...");

        List<BaseMediaResponseDTO> resultList = new ArrayList<>();

        for (TMDBResponseItemDTO tmdbResponseItem : tmdbResponse.getResults()) {

            if (!MOVIE.equals(tmdbResponseItem.getMedia_type()) && !TV.equals(tmdbResponseItem.getMedia_type())) {
                continue;
            }

            if (tmdbResponseItem.getId() == null || tmdbResponseItem.getDisplayTitle() == null || tmdbResponseItem.getDisplayTitle().isBlank()) {
                continue;
            }

            log.debug("Including media item '{}' in results list.", tmdbResponseItem.getDisplayTitle());

            resultList.add(new BaseMediaResponseDTO(
                    tmdbResponseItem.getId().toString(),
                    tmdbResponseItem.getDisplayTitle(),
                    tmdbResponseItem.getOverview(),
                    tmdbResponseItem.getDisplayMediaType(),
                    mapTMDBGenres(tmdbResponseItem.getGenre_ids()),
                    tmdbResponseItem.getDisplayReleaseDate(),
                    tmdbResponseItem.getVote_average(),
                    buildCoverImgUrl(tmdbResponseItem.getPoster_path())
            ));
        }

        return resultList;
    }

    private Set<GenreEnum> mapTMDBGenres(List<Integer> genreIds) {
        if (genreIds == null) {
            return Set.of(GenreEnum.OTHER);
        }

        return genreIds.stream()
                .map(id -> GENRE_BY_TMDB_ID.getOrDefault(id, GenreEnum.OTHER))
                .collect(Collectors.toUnmodifiableSet());
    }

    private String buildCoverImgUrl(String posterPath) {
        if (posterPath == null || posterPath.isBlank()) {
            return null;
        }

        return COVER_IMG_BASE_URL + posterPath;
    }

}