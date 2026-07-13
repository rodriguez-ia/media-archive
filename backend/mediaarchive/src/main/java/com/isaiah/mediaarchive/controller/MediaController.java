package com.isaiah.mediaarchive.controller;

import com.isaiah.mediaarchive.model.dto.ApiResponse;
import com.isaiah.mediaarchive.model.dto.MediaResponseDTO;
import com.isaiah.mediaarchive.model.entity.UserEntity;
import com.isaiah.mediaarchive.service.MediaService;
import com.isaiah.mediaarchive.util.ApiResponseFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @GetMapping("/user-media")
    public ResponseEntity<ApiResponse<List<MediaResponseDTO>>> getAllUserMedia(@AuthenticationPrincipal UserEntity user) {
        List<MediaResponseDTO> mediaResponseDTOList = mediaService.getAllUserMedia(user);

        return ResponseEntity.status(200).body(
                ApiResponseFactory.success(
                        mediaResponseDTOList,
                        "MediaController.getAllUserMedia",
                        "Retrieved all user media successfully"
                )
        );
    }
}
