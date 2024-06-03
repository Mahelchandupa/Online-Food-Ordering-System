package com.mahel.FoodOrderingService.dto;

import lombok.Data;

@Data
public class IngredientItemDTO {

    private String name;
    private Long categoryId;
    private Long restaurantId;
}
