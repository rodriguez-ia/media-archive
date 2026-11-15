package com.isaiah.mediaarchive.client;

import com.isaiah.mediaarchive.model.dto.IGDBResponseItemDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;

@Component
public class IGDBClient {

    private final String clientId;
    private final RestClient restClient;

    public IGDBClient(
            @Value("${external.igdb.client-id}") String clientId,
            RestClient.Builder builder
    ) {
        this.clientId = clientId;
        this.restClient = builder
                .baseUrl("https://api.igdb.com/v4")
                .build();
    }

    public List<IGDBResponseItemDTO> searchGameByKeyword(String accessToken, String keyword) {
        String queryGameByKeyword =
                "search \"%s\";" +
                "fields name, summary, storyline, themes, first_release_date, rating, cover.image_id;";

        System.out.println("token: "+accessToken);
        System.out.println("id: "+clientId);

        return restClient
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/games")
                        .build()
                )
                .header("Authorization", "Bearer " + accessToken)
                .header("Client-ID", clientId)
                .contentType(MediaType.TEXT_PLAIN)
                .body(String.format(queryGameByKeyword, keyword))
                .retrieve()
                .body(new ParameterizedTypeReference<List<IGDBResponseItemDTO>>() {});
    }
}
