package com.mahel.FoodOrderingService.dto;

import com.mahel.FoodOrderingService.model.Category;
import com.mahel.FoodOrderingService.model.IngredientsItem;
import lombok.Data;

import java.util.List;

@Data
public class FoodDTO {

    private String name;
    private String description;
    private Long price;
    private Category category;
    private List<String> images;
    private Long restaurantId;
    private boolean vegetarian;
    private boolean seasonal;
    private List<IngredientsItem> ingredients;
}
