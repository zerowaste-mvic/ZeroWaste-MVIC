package com.zerowaste.zerowaste.exception;

import org.springframework.http.HttpStatusCode;
import org.springframework.lang.NonNull;

public class ApiException extends RuntimeException {

    @NonNull
    private final HttpStatusCode status;

    public ApiException(@NonNull String message, @NonNull HttpStatusCode status) {
        super(message);
        this.status = status;
    }

    @NonNull
    public HttpStatusCode getStatus() {
        return status;
    }
}
