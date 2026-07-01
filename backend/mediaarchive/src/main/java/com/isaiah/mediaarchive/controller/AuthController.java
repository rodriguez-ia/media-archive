package com.isaiah.mediaarchive.controller;

import com.isaiah.mediaarchive.model.dto.ApiResponse;
import com.isaiah.mediaarchive.model.dto.RegisterRequestDTO;
import com.isaiah.mediaarchive.model.dto.RegisterResponseDTO;
import com.isaiah.mediaarchive.service.AuthService;
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
        RegisterResponseDTO user = authService.register(requestDTO);

        return ResponseEntity.status(201).body(ApiResponseFactory.created(user, "AuthController.register", "User registered successfully"));
    }

    @GetMapping("/test")
    public String test() {
        return "Hello World!";
    }
}
