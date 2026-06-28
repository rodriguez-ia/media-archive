package com.isaiah.mediaarchive.mapper;

import com.isaiah.mediaarchive.model.dto.RegisterRequestDTO;
import com.isaiah.mediaarchive.model.dto.RegisterResponseDTO;
import com.isaiah.mediaarchive.model.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserEntity toEntity(RegisterRequestDTO requestDTO) {
        return new UserEntity(
                requestDTO.getUsername(),
                requestDTO.getEmail(),
                requestDTO.getPassword()
        );
    }

    public RegisterResponseDTO toRegisterResponse(UserEntity user) {
        return new RegisterResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail()
        );
    }
}
