package com.isaiah.mediaarchive.controller;

import com.isaiah.mediaarchive.model.dto.RegisterRequestDTO;
import com.isaiah.mediaarchive.model.dto.RegisterResponseDTO;
import com.isaiah.mediaarchive.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public RegisterResponseDTO register(@Valid @RequestBody RegisterRequestDTO requestDTO) {
        return authService.register(requestDTO);
    }

    @GetMapping("/test")
    public String test() {
        return "Hello World!";
    }
}
