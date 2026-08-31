package com.isaiah.mediaarchive.mapper;

import com.isaiah.mediaarchive.model.dto.BaseMediaResponseDTO;
import com.isaiah.mediaarchive.model.dto.TMDBResponseItemDTO;
import com.isaiah.mediaarchive.model.dto.TMDBSearchResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TMDBMapper {

    private static final Logger log = LoggerFactory.getLogger(TMDBMapper.class);

    private final String COVER_IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
    private final String MOVIE = "movie";
    private final String TV = "tv";

    public List<BaseMediaResponseDTO> tmdbResponseToBaseMediaResponseDTOList(TMDBSearchResponseDTO tmdbResponse) {

        log.debug("Mapping TMDB API response data to BaseMediaResponseDTO...");

        List<BaseMediaResponseDTO> resultList = new ArrayList<>();

        for (TMDBResponseItemDTO tmdbResponseItem : tmdbResponse.getResults()) {
            if ( MOVIE.equals(tmdbResponseItem.getMedia_type()) || TV.equals(tmdbResponseItem.getMedia_type()) ) {
                log.debug("Including media item '{}' in results list.", tmdbResponseItem.getDisplayTitle());

                resultList.add(new BaseMediaResponseDTO(
                        tmdbResponseItem.getId().toString(),
                        tmdbResponseItem.getDisplayTitle(),
                        tmdbResponseItem.getOverview(),
                        tmdbResponseItem.getDisplayMediaType(),
                        null,
                        tmdbResponseItem.getDisplayReleaseDate(),
                        tmdbResponseItem.getVote_average(),
                        COVER_IMG_BASE_URL + tmdbResponseItem.getPoster_path()
                ));
            }
        }

        return resultList;
    }
}