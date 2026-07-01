package com.isaiah.mediaarchive.util;

import com.isaiah.mediaarchive.model.dto.ApiResponse;
import com.isaiah.mediaarchive.model.dto.ResponseMessage;
import lombok.experimental.UtilityClass;

@UtilityClass
public class ApiResponseFactory {

    public static <T> ApiResponse<T> success(T data, String source, String detail) {
        return new ApiResponse<>(
                new ResponseMessage(200, true, source, detail),
                data
        );
    }

    public static <T> ApiResponse<T> created(T data, String source, String detail) {
        return new ApiResponse<>(
                new ResponseMessage(201, true, source, detail),
                data
        );
    }

    public static <T> ApiResponse<T> failure(T data, int status, String source, String detail) {
        return new ApiResponse<>(
                new ResponseMessage(
                        status,
                        false,
                        source,
                        detail
                ),
                data
        );
    }
}
