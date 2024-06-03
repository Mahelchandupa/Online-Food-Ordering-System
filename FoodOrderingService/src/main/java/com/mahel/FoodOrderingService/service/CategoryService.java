package com.mahel.FoodOrderingService.service;

import com.mahel.FoodOrderingService.model.Category;

import java.util.List;

public interface CategoryService {

    public Category createCategory(String name, Long restaurantId);

    public List<Category> findCategoryByRestaurantId(Long id) throws Exception;

    public Category findCategoryById(Long id) throws Exception;

}
