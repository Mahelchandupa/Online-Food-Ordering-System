package com.mahel.FoodOrderingService.service.impl;

import com.mahel.FoodOrderingService.dto.FoodDTO;
import com.mahel.FoodOrderingService.exception.BadRequestException;
import com.mahel.FoodOrderingService.model.Category;
import com.mahel.FoodOrderingService.model.Food;
import com.mahel.FoodOrderingService.model.Restaurant;
import com.mahel.FoodOrderingService.repository.FoodRepository;
import com.mahel.FoodOrderingService.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public Food createFood(FoodDTO foodDTO, Category category, Restaurant restaurant) {

        Food food = new Food();
        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setDescription(foodDTO.getDescription());
        food.setImages(foodDTO.getImages());
        food.setName(foodDTO.getName());
        food.setPrice(foodDTO.getPrice());
        food.setIngredientsItems(foodDTO.getIngredients());
        food.setSeasonal(foodDTO.isSeasonal());
        food.setVegetarian(foodDTO.isVegetarian());

        Food savedFood = foodRepository.save(food);
        restaurant.getFoods().add(savedFood);

        return savedFood;
    }

    @Override
    public boolean deleteFood(Long id) throws Exception {

        Food food = findFoodById(id);
        food.setRestaurant(null);

        foodRepository.save(food);

        return true;
    }

    @Override
    public List<Food> getAllRestaurantFoods(Long restaurantId, boolean isVegetarian, boolean isNonVeg, boolean isSeasonal, String foodCategory) {

        List<Food> foods = foodRepository.findByRestaurantId(restaurantId);

        if (isVegetarian && isSeasonal) {
            foods = foods.stream()
                    .filter(food -> food.isVegetarian() && food.isSeasonal())
                    .collect(Collectors.toList());
        } else if (isVegetarian) {
            foods = foods.stream()
                    .filter(Food::isVegetarian)
                    .collect(Collectors.toList());
        }

        if (isNonVeg && isSeasonal) {
            foods = foods.stream()
                    .filter(food -> !food.isVegetarian() && food.isSeasonal())
                    .collect(Collectors.toList());
        } else if (isNonVeg) {
            foods = foods.stream()
                    .filter(food -> !food.isVegetarian())
                    .collect(Collectors.toList());
        }

        if (foodCategory != null && !foodCategory.trim().isEmpty()) {
            foods = foods.stream()
                    .filter(food -> food.getFoodCategory() != null && food.getFoodCategory().getName().equals(foodCategory))
                    .collect(Collectors.toList());
        }

        return foods;
    }

    @Override
    public List<Food> searchFood(String keyword) {
        return foodRepository.searchFood(keyword);
    }

    @Override
    public Food findFoodById(Long id) throws Exception {

        Optional<Food> foodOptional = foodRepository.findById(id);

        if (foodOptional.isEmpty()) {
            throw new BadRequestException("Food Does not Exist");
        }

        return foodOptional.get();
    }

    @Override
    public Food updateAvailability(Long foodId) throws Exception {

        Food food = findFoodById(foodId);
        food.setAvailable(!food.isAvailable());

        return foodRepository.save(food);
    }
}
