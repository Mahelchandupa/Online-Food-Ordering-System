package com.mahel.FoodOrderingService.dto;

import com.mahel.FoodOrderingService.model.Address;
import lombok.Data;

@Data
public class OrderDTO {

    private Long restaurantId;
    private Address deliveryAddress;

}
