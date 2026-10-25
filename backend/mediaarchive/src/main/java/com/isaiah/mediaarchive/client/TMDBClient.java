package com.isaiah.mediaarchive.client;

import com.isaiah.mediaarchive.model.dto.TMDBSearchResponseDTO;
import com.isaiah.mediaarchive.model.dto.TMDBTVSeasonDetailsSearchResponseDTO;
import com.isaiah.mediaarchive.model.dto.TMDBTVShowDetailsSearchResponseDTO;
import com.isaiah.mediaarchive.model.enums.MediaTypeEnum;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class TMDBClient {

    private final String apiReadAccessToken;
    private final RestClient restClient;

    public TMDBClient(
            @Value("${external.tmdb.read-access-token}") String apiReadAccessToken,
            RestClient.Builder builder
    ) {
        this.apiReadAccessToken = apiReadAccessToken;
        this.restClient = builder
                .baseUrl("https://api.themoviedb.org/3")
                .build();
    }

    public TMDBSearchResponseDTO searchMultiByKeyword(
            String keyword,
            int page
    ) {
        return restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/multi")
                        .queryParam("query", keyword)
                        .queryParam("page", page)
                        .build())
                .header("Authorization", "Bearer " + apiReadAccessToken)
                .retrieve()
                .body(TMDBSearchResponseDTO.class);
    }

    public TMDBTVShowDetailsSearchResponseDTO searchTVShowDetailsByExternalId(String tvShowExternalId) {
        return restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/tv/" + tvShowExternalId)
                        .build())
                .header("Authorization", "Bearer " + apiReadAccessToken)
                .retrieve()
                .body(TMDBTVShowDetailsSearchResponseDTO.class);
    }

    public TMDBTVSeasonDetailsSearchResponseDTO searchTVSeasonDetailsByExternalId(String tvShowExternalId, Integer seasonNumber) {
        return restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/tv/" + tvShowExternalId + "/season/" + seasonNumber.toString())
                        .build())
                .header("Authorization", "Bearer " + apiReadAccessToken)
                .retrieve()
                .body(TMDBTVSeasonDetailsSearchResponseDTO.class);
    }

    public TMDBSearchResponseDTO searchTrending() {
        return restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/trending/all/day")
                        .build())
                .header("Authorization", "Bearer " + apiReadAccessToken)
                .retrieve()
                .body(TMDBSearchResponseDTO.class);
    }

    public TMDBSearchResponseDTO searchNowPlaying() {
        return restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/now_playing")
                        .build())
                .header("Authorization", "Bearer " + apiReadAccessToken)
                .retrieve()
                .body(TMDBSearchResponseDTO.class);
    }

    public TMDBSearchResponseDTO searchRecommended(String externalId, MediaTypeEnum mediaType) {
        String pathStart = mediaType == MediaTypeEnum.MOVIE ? "/movie/" : "/tv/";

        return restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path(pathStart + externalId + "/recommendations")
                        .build())
                .header("Authorization", "Bearer " + apiReadAccessToken)
                .retrieve()
                .body(TMDBSearchResponseDTO.class);
    }

}