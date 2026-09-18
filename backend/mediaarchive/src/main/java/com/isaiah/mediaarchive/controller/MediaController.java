package com.isaiah.mediaarchive.controller;

import com.isaiah.mediaarchive.model.dto.*;
import com.isaiah.mediaarchive.model.entity.UserEntity;
import com.isaiah.mediaarchive.service.MediaService;
import com.isaiah.mediaarchive.util.ApiResponse;
import com.isaiah.mediaarchive.util.ApiResponseFactory;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @GetMapping("/library")
    public ResponseEntity<ApiResponse<List<UserMediaResponseDTO>>> getAllFromUserLibrary(@AuthenticationPrincipal UserEntity user) {
        List<UserMediaResponseDTO> userMediaResponseDTOList = mediaService.getAllFromUserLibrary(user);

        return ResponseEntity.status(200).body(
                ApiResponseFactory.success(
                        userMediaResponseDTOList,
                        "MediaController.getAllFromUserLibrary",
                        "Retrieved all user media successfully"
                )
        );
    }

    @PostMapping("/library")
    public ResponseEntity<ApiResponse<List<UserMediaResponseDTO>>> addToUserLibrary(@AuthenticationPrincipal UserEntity user,
                                                                                    @Valid @RequestBody List<AddMediaToLibraryRequestDTO> mediaList) {
        List<UserMediaResponseDTO> userMediaResponseDTOList = mediaService.addToUserLibrary(user, mediaList);

        return ResponseEntity.status(201).body(
                ApiResponseFactory.created(
                        userMediaResponseDTOList,
                        "MediaController.addToUserLibrary",
                        "Added media to user library successfully"
                )
        );
    }

    @GetMapping("/library/{externalId}")
    public ResponseEntity<ApiResponse<List<UserMediaResponseDTO>>> getMediaItemDetails(@AuthenticationPrincipal UserEntity user,
                                                                                       @PathVariable String externalId) {
        List<UserMediaResponseDTO> userMediaResponseDTOList = mediaService.getUserMediaByParentExternalId(user, externalId);

        return ResponseEntity.status(200).body(
                ApiResponseFactory.success(
                        userMediaResponseDTOList,
                        "MediaController.getMediaItemDetails",
                        "Retrieved media item details successfully: user=" + user.getUsername() + ", externalId=" + externalId
                )
        );
    }

    @PatchMapping("/library/{externalId}")
    public ResponseEntity<ApiResponse<UserMediaResponseDTO>> updateUserMediaItem(@AuthenticationPrincipal UserEntity user,
                                                                                 @PathVariable String externalId,
                                                                                 @Valid @RequestBody UpdateUserMediaItemRequestDTO userMediaUpdates) {
        UserMediaResponseDTO userMediaResponseDTO = mediaService.updateUserMediaItem(user, externalId, userMediaUpdates);

        return ResponseEntity.status(200).body(
                ApiResponseFactory.success(
                        userMediaResponseDTO,
                        "MediaController.updateUserMediaItem",
                        "Updated user media item successfully"
                )
        );
    }

    @GetMapping("/catalog")
    public ResponseEntity<ApiResponse<List<BaseMediaResponseDTO>>> getFromCatalog(@AuthenticationPrincipal UserEntity user) {
        List<BaseMediaResponseDTO> baseMediaResponseDTOList = mediaService.getFromCatalog(user);

        return ResponseEntity.status(200).body(
                ApiResponseFactory.success(
                        baseMediaResponseDTOList,
                        "MediaController.getFromCatalog",
                        "Retrieved all base media for user successfully"
                )
        );
    }

    @GetMapping("/externalMedia")
    public ResponseEntity<ApiResponse<List<BaseMediaResponseDTO>>> searchExternalMediaByKeyword(@RequestParam String keyword,
                                                                                                @RequestParam(defaultValue = "1") int page,
                                                                                                @RequestParam boolean shouldSearchMoviesAndTV,
                                                                                                @RequestParam boolean shouldSearchMusic,
                                                                                                @RequestParam boolean shouldSearchBooks) {
        List<BaseMediaResponseDTO> baseMediaResponseDTOList =
                mediaService.searchExternalMediaByKeyword(
                        keyword,
                        page,
                        shouldSearchMoviesAndTV,
                        shouldSearchMusic,
                        shouldSearchBooks
                );

        return ResponseEntity.status(200).body(
                ApiResponseFactory.success(
                        baseMediaResponseDTOList,
                        "MediaController.searchExternalMedia",
                        "Search for external media was successful"
                )
        );
    }

    @GetMapping("/externalMedia/music/track/{externalId}")
    public ResponseEntity<ApiResponse<DeezerTrackSearchResponseDTO>> getMusicTrackDetails(@PathVariable String externalId) {
        DeezerTrackSearchResponseDTO musicTrackDetails = mediaService.getMusicTrackDetails(externalId); // call https://api.deezer.com/track/{externalId}

        return ResponseEntity.status(200).body(
                ApiResponseFactory.success(
                        musicTrackDetails,
                        "MediaController.getMusicTrackDetails",
                        "Retrieved music track details successfully"
                )
        );
    }
}
