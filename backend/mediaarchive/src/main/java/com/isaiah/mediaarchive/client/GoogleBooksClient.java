package com.isaiah.mediaarchive.client;

import com.isaiah.mediaarchive.model.dto.GoogleBooksSearchResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class GoogleBooksClient {

    private final String apiKey;
    private final RestClient restClient;

    private final int PAGE_SIZE = 10;

    public GoogleBooksClient(
            @Value("${external.google-books.api-key}") String apiKey,
            RestClient.Builder builder
    ) {
        this.apiKey = apiKey;
        this.restClient = builder
                .baseUrl("https://www.googleapis.com/books")
                .build();
    }

    public GoogleBooksSearchResponseDTO searchVolumeByKeyword(
            String keyword,
            int page
    ) {
        return restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/volumes")
                        .queryParam("key", apiKey)
                        .queryParam("q", keyword)
                        .queryParam("startIndex", ( page - 1 ) * PAGE_SIZE)
                        .queryParam("maxResults", PAGE_SIZE)
                        .build())
                .retrieve()
                .body(GoogleBooksSearchResponseDTO.class);
    }
}