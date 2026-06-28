package com.isaiah.mediaarchive.service;

import com.isaiah.mediaarchive.mapper.UserMapper;
import com.isaiah.mediaarchive.model.dto.RegisterRequestDTO;
import com.isaiah.mediaarchive.model.dto.RegisterResponseDTO;
import com.isaiah.mediaarchive.model.entity.UserEntity;
import com.isaiah.mediaarchive.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       UserMapper userMapper,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public RegisterResponseDTO register(RegisterRequestDTO requestDTO) {
        String username = requestDTO.getUsername();
        String email = requestDTO.getEmail();
        String password = requestDTO.getPassword();

        if (username == null || username.isBlank() ||
            email == null || email.isBlank() ||
            password == null || password.isBlank()) {
            throw new IllegalArgumentException("Valid username, email, and password are required for registration.");
        }

        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Provided username not available.");
        }

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Provided email not available.");
        }

        String passwordHash = passwordEncoder.encode(password);

        UserEntity newUser = new UserEntity(username, email, passwordHash);
        userRepository.save(newUser);

        return userMapper.toRegisterResponse(newUser);
    }
}
