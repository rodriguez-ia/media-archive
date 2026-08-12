package com.isaiah.mediaarchive.util;

import lombok.Getter;
import lombok.AllArgsConstructor;

@Getter
@AllArgsConstructor
public class ResponseMessage {

    private final int status;

    private final boolean success;

    private final String source;

    private final String detail;
}
