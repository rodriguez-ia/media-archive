package com.isaiah.mediaarchive.repository;

import com.isaiah.mediaarchive.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
