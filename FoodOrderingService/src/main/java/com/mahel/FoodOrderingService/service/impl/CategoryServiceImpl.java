package com.mahel.FoodOrderingService.service.impl;

import com.mahel.FoodOrderingService.exception.BadRequestException;
import com.mahel.FoodOrderingService.model.Category;
import com.mahel.FoodOrderingService.model.Restaurant;
import com.mahel.FoodOrderingService.repository.CategoryRepository;
import com.mahel.FoodOrderingService.service.CategoryService;
import com.mahel.FoodOrderingService.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public Category createCategory(String name, Long restaurantId) {

        Restaurant restaurant = restaurantService.findById(restaurantId);

        Category category = new Category();
        category.setName(name);
        category.setRestaurant(restaurant);

        return categoryRepository.save(category);
    }

    @Override
    public List<Category> findCategoryByRestaurantId(Long id) throws Exception {
        return categoryRepository.findByRestaurantId(id);
    }

    @Override
    public Category findCategoryById(Long id) throws Exception {

        Optional<Category> optionalCategory = categoryRepository.findById(id);

        if (optionalCategory.isEmpty()) {
            throw new BadRequestException("Category Not Found");
        }

        return optionalCategory.get();
    }
}
