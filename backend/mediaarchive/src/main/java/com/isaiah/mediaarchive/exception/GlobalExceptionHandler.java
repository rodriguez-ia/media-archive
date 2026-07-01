package com.isaiah.mediaarchive.exception;

import com.isaiah.mediaarchive.model.dto.ApiErrorDTO;
import com.isaiah.mediaarchive.model.dto.ApiResponse;
import com.isaiah.mediaarchive.util.ApiResponseFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    public static final Logger log = LoggerFactory.getLogger((GlobalExceptionHandler.class));

    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<ApiResponse<?>> handleDuplicateUser(DuplicateUserException ex) {

        log.warn("Duplicate user error: field={}, message='{}'", ex.getField(), ex.getMessage());

        ApiErrorDTO error = new ApiErrorDTO(ex.getField(), ex.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                ApiResponseFactory.failure(
                        error,
                        409,
                        "DuplicateUserException",
                        ex.getMessage()
                )
        );
    }
}
