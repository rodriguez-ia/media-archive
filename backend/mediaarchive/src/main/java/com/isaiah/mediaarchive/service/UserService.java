package com.isaiah.mediaarchive.service;

import com.isaiah.mediaarchive.model.entity.UserEntity;
import com.isaiah.mediaarchive.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity getUserByUsername(String username) {

        log.debug("Retrieving UserEntity for username='{}'", username);

        UserEntity user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found.");
        }

        log.debug("User found: username='{}', createdAt='{}'", user.getUsername(), user.getCreatedAt());

        return user;
    }
}
