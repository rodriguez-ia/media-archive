package com.isaiah.mediaarchive.service;

import com.isaiah.mediaarchive.exception.DuplicateUserException;
import com.isaiah.mediaarchive.mapper.UserMapper;
import com.isaiah.mediaarchive.model.dto.RegisterRequestDTO;
import com.isaiah.mediaarchive.model.dto.RegisterResponseDTO;
import com.isaiah.mediaarchive.model.entity.UserEntity;
import com.isaiah.mediaarchive.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

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

        String emailDomain = email.substring(email.indexOf('@') + 1);

        log.info("Attempting to register username='{}', email domain='{}'", username, emailDomain);

        if (userRepository.existsByUsername(username)) {
            throw new DuplicateUserException("username", "Username already exists.");
        }

        if (userRepository.existsByEmail(email)) {
            throw new DuplicateUserException("email", "Email already exists.");
        }

        String passwordHash = passwordEncoder.encode(password);

        UserEntity newUser = new UserEntity(username, email, passwordHash);
        userRepository.save(newUser);

        log.info("User '{}' registered successfully with id={}", newUser.getUsername(), newUser.getId());

        return userMapper.toRegisterResponse(newUser);
    }
}
