package com.isaiah.mediaarchive.client;

import com.isaiah.mediaarchive.model.dto.GoogleBooksSearchResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class GoogleBooksClient {

    private final String apiKey;
    private final RestClient restClient;

    public GoogleBooksClient(
            @Value("${external.google-books.api-key}") String apiKey,
            RestClient.Builder builder
    ) {
        this.apiKey = apiKey;
        this.restClient = builder
                .baseUrl("https://www.googleapis.com/books")
                .build();
    }

    public GoogleBooksSearchResponseDTO searchVolumeByKeyword(String keyword) {
        return restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/volumes")
                        .queryParam("q", keyword)
                        .queryParam("key", apiKey)
                        .build())
                .retrieve()
                .body(GoogleBooksSearchResponseDTO.class);
    }
}