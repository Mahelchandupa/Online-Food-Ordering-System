package com.mahel.FoodOrderingService.dto.response;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ResponseDTO<T> {

    public HttpStatus httpStatus;

    public String code;

    public String message;

    public T payload;

    public ResponseDTO() {};

    public ResponseDTO(T payload, String message, HttpStatus httpStatus) {
        this.payload = payload;
        this.message = message;
        this.httpStatus = httpStatus;
    }

    @Override
    public String toString() {
        return "ResponseDTO{" +
                "httpStatus=" + httpStatus +
                ", code='" + code + '\'' +
                ", message=" + message +
                ", payload='" + payload + '\'' +
                '}';
    }

}
