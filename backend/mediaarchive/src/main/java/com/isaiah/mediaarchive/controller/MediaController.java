package com.isaiah.mediaarchive.controller;

import com.isaiah.mediaarchive.model.dto.BaseMediaResponseDTO;
import com.isaiah.mediaarchive.model.dto.AddMediaToLibraryRequestDTO;
import com.isaiah.mediaarchive.model.dto.UserMediaResponseDTO;
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
}
