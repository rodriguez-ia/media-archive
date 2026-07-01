package com.isaiah.mediaarchive.exception;

import com.isaiah.mediaarchive.model.dto.ApiErrorDTO;
import com.isaiah.mediaarchive.model.dto.ApiResponse;
import com.isaiah.mediaarchive.util.ApiResponseFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<ApiResponse<?>> handleDuplicateUser(DuplicateUserException ex) {

        ApiErrorDTO error = new ApiErrorDTO(ex.getField(), ex.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                ApiResponseFactory.failure(
                        error,
                        409,
                        null,
                        ex.getMessage()
                )
        );
    }
}
