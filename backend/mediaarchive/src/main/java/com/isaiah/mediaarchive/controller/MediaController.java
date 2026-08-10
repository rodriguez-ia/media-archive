package com.isaiah.mediaarchive.controller;

import com.isaiah.mediaarchive.model.dto.ApiResponse;
import com.isaiah.mediaarchive.model.dto.BaseMediaResponseDTO;
import com.isaiah.mediaarchive.model.dto.UserMediaResponseDTO;
import com.isaiah.mediaarchive.model.entity.UserEntity;
import com.isaiah.mediaarchive.service.MediaService;
import com.isaiah.mediaarchive.util.ApiResponse;
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
    public ResponseEntity<ApiResponse<List<UserMediaResponseDTO>>> getAllUserMedia(@AuthenticationPrincipal UserEntity user) {
        List<UserMediaResponseDTO> userMediaResponseDTOList = mediaService.getAllUserMedia(user);

        return ResponseEntity.status(200).body(
                ApiResponseFactory.success(
                        userMediaResponseDTOList,
                        "MediaController.getAllUserMedia",
                        "Retrieved all user media successfully"
                )
        );
    }

    @GetMapping("/base-media")
    public ResponseEntity<ApiResponse<List<BaseMediaResponseDTO>>> getAllBaseMediaForUser(@AuthenticationPrincipal UserEntity user) {
        List<BaseMediaResponseDTO> baseMediaResponseDTOList = mediaService.getAllBaseMediaForUser(user);

        return ResponseEntity.status(200).body(
                ApiResponseFactory.success(
                        baseMediaResponseDTOList,
                        "MediaController.getAllBaseMediaForUser",
                        "Retrieved all base media for user successfully"
                )
        );
    }
}
