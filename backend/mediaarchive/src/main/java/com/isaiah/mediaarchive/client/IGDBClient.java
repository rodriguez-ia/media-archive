package com.isaiah.mediaarchive.client;

import com.isaiah.mediaarchive.model.dto.IGDBResponseItemDTO;
import com.isaiah.mediaarchive.model.dto.IGDBVideoGameVideoDTO;
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
                "fields name, summary, storyline, themes, first_release_date, rating, cover.image_id;" +
                "where game_type = (0, 8, 9);";

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

    public List<IGDBVideoGameVideoDTO> getGameVideosByGameId(String accessToken, String gameId) {
        String queryGameVideoByGameId =
                "fields name, video_id;" +
                "where game = '%s';";

        return restClient
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/game_videos")
                        .build()
                )
                .header("Authorization", "Bearer " + accessToken)
                .header("Client-ID", clientId)
                .contentType(MediaType.TEXT_PLAIN)
                .body(String.format(queryGameVideoByGameId, gameId))
                .retrieve()
                .body(new ParameterizedTypeReference<List<IGDBVideoGameVideoDTO>>() {});
    }
}
