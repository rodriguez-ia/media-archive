package com.isaiah.mediaarchive.exception;

import lombok.Getter;

@Getter
public class DuplicateUserException extends RuntimeException{

    public DuplicateUserException(String message) {
        super(message);
    }
}
