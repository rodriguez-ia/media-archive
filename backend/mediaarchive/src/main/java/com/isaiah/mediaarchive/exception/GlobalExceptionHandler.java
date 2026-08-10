package com.isaiah.mediaarchive.exception;

import com.isaiah.mediaarchive.util.ApiResponse;
import com.isaiah.mediaarchive.util.ApiResponseFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    public static final Logger log = LoggerFactory.getLogger((GlobalExceptionHandler.class));

    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<ApiResponse<?>> handleDuplicateUser(DuplicateUserException ex) {

        log.warn("Duplicate user error: message='{}'", ex.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                ApiResponseFactory.failure(
                        null,
                        409,
                        "DuplicateUserException",
                        ex.getMessage()
                )
        );
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleUsernameNotFound(UsernameNotFoundException ex) {

        log.warn("Username not found error: message='{}'", ex.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                ApiResponseFactory.failure(
                        null,
                        404,
                        "UsernameNotFoundException",
                        ex.getMessage()
                )
        );
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ApiResponse<?>> handleInvalidCredentials(InvalidCredentialsException ex) {

        log.warn("Invalid credentials error: message='{}'", ex.getMessage());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                ApiResponseFactory.failure(
                        null,
                        404,
                        "InvalidCredentialsException",
                        ex.getMessage()
                )
        );
    }

    @ExceptionHandler(MediaNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleMediaNotFound(MediaNotFoundException ex) {

        log.warn("Media not found error: message='{}'", ex.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                ApiResponseFactory.failure(
                        null,
                        404,
                        "MediaNotFoundException",
                        ex.getMessage()
                )
        );
    }
}
