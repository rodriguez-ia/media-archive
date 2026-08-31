package com.isaiah.mediaarchive.client;

import com.isaiah.mediaarchive.model.dto.DeezerSearchResponseDTO;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class DeezerClient {

    private final RestClient restClient;

    private final int PAGE_SIZE = 10;

    public DeezerClient(RestClient.Builder builder) {
        this.restClient = builder
                .baseUrl("https://api.deezer.com")
                .build();
    }

    public DeezerSearchResponseDTO searchAlbumByKeyword(
            String keyword,
            int page
    ) {
        return restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/album")
                        .queryParam("q", keyword)
                        .queryParam("index", ( page - 1 ) * PAGE_SIZE)
                        .queryParam("limit", PAGE_SIZE)
                        .build())
                .retrieve()
                .body(DeezerSearchResponseDTO.class);
    }
}
