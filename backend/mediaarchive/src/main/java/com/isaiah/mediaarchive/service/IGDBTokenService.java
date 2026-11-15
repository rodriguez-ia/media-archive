package com.isaiah.mediaarchive.service;

import com.isaiah.mediaarchive.model.dto.IGDBTokenResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;

@Service
public class IGDBTokenService {

    private final String CLIENT_CREDENTIALS = "client_credentials";

    private final String clientId;
    private final String clientSecret;
    private final RestClient restClient;

    private String accessToken;
    private LocalDateTime expiresAt;

    private static final Logger log = LoggerFactory.getLogger(IGDBTokenService.class);

    public IGDBTokenService(
            @Value("external.igdb.client-id") String clientId,
            @Value("external.igdb.client-secret") String clientSecret,
            RestClient.Builder builder
    ) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.restClient = builder
                .baseUrl("https://id.twitch.tv")
                .build();
    }

    public String getAccessToken() {
        if (needsRefresh()) {
            log.debug("Acquiring new IGDB access token.");

            acquireToken();
        }

        if (expiresAt != null) {
            log.debug("IGDB access token expires at {}", expiresAt.toString());
        }

        return accessToken;
    }

    public boolean needsRefresh() {
        return accessToken == null ||
                expiresAt == null ||
                LocalDateTime.now().isAfter(expiresAt.minusHours(24));
    }

    private void acquireToken() {
        IGDBTokenResponseDTO response =
                restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/oauth2/token")
                        .queryParam("client_id", clientId)
                        .queryParam("client_secret", clientSecret)
                        .queryParam("grant_type", CLIENT_CREDENTIALS)
                        .build())
                .retrieve()
                .body(IGDBTokenResponseDTO.class);

        if (response == null) {
            log.warn("Failed to acquire IGDB access token");
            return;
        }

        accessToken = response.getAccessToken();
        expiresAt = LocalDateTime.now().plusSeconds(response.getExpiresIn());
    }
}
