package com.isaiah.mediaarchive.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiResponse<T> {

    private ResponseMessage message;

    private T data;
}
