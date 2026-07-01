package com.isaiah.mediaarchive.exception;

import lombok.Getter;

@Getter
public class DuplicateUserException extends RuntimeException{

    private final String field;

    public DuplicateUserException(String field, String message) {
        super(message);
        this.field = field;
    }
}
