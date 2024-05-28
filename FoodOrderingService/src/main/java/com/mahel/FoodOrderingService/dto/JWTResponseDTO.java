package com.mahel.FoodOrderingService.dto;

import com.mahel.FoodOrderingService.enums.UserRole;
import lombok.Data;

@Data
public class JWTResponseDTO {

    private String jwt;

    private String email;

    private String userName;

    private UserRole role;
}
