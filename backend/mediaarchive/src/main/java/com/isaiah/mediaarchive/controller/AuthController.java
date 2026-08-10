package com.isaiah.mediaarchive.controller;

import com.isaiah.mediaarchive.model.dto.*;
import com.isaiah.mediaarchive.service.AuthService;
import com.isaiah.mediaarchive.util.ApiResponse;
import com.isaiah.mediaarchive.util.ApiResponseFactory;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponseDTO>> register(@Valid @RequestBody RegisterRequestDTO requestDTO) {
        RegisterResponseDTO responseDTO = authService.register(requestDTO);

        return ResponseEntity.status(201).body(
                ApiResponseFactory.created(
                        responseDTO,
                        "AuthController.register",
                        "User registered successfully"
                )
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDTO>> login(@Valid @RequestBody LoginRequestDTO requestDTO) {
        LoginResponseDTO responseDTO = authService.login(requestDTO);

        return ResponseEntity.status(200).body(
                ApiResponseFactory.success(
                        responseDTO,
                        "AuthController.login",
                        "User login successful"
                )
        );
    }

    @GetMapping("/test")
    public String testJwtAuth() {
        return "Authentication successful";
    }
}
