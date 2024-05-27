package com.mahel.FoodOrderingService.dto;

import com.mahel.FoodOrderingService.enums.UserRole;
import com.mahel.FoodOrderingService.model.Address;
import com.mahel.FoodOrderingService.model.Order;
import com.mahel.FoodOrderingService.model.Restaurant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long id;

    private String fullName;

    private String email;

    private String password;

    private UserRole role;

    private List<Order> orders;

    private List<RestaurantDTO> favorites;

    private List<Address> addresses;

    private Restaurant restaurant;
}
