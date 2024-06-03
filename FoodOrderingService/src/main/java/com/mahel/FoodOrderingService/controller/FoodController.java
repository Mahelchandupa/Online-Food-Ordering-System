package com.mahel.FoodOrderingService.controller;

import com.mahel.FoodOrderingService.dto.response.ResponseDTO;
import com.mahel.FoodOrderingService.model.Food;
import com.mahel.FoodOrderingService.service.FoodService;
import com.mahel.FoodOrderingService.service.RestaurantService;
import com.mahel.FoodOrderingService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/foods")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/search")
    public ResponseEntity<ResponseDTO<List<Food>>> searchFood(@RequestParam String keyword){

        ResponseDTO<List<Food>> response = new ResponseDTO<>();
        List<Food> foods = foodService.searchFood(keyword);

        response.setPayload(foods);
        response.setMessage("Successful");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @GetMapping("/restaurant/restaurantId")
    public ResponseEntity<ResponseDTO<List<Food>>> getRestaurantFood(
            @RequestParam boolean vegetarian,
            @RequestParam boolean seasonal,
            @RequestParam boolean nonveg,
            @RequestParam(required = false) String food_category,
            @PathVariable Long restaurantId,
            @RequestHeader("Authorization") String jwt
    ) {

        ResponseDTO<List<Food>> response = new ResponseDTO<>();
        List<Food> foods = foodService.getAllRestaurantFoods(restaurantId, vegetarian, nonveg, seasonal, food_category);

        response.setPayload(foods);
        response.setMessage("Successful");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO<Boolean>> deleteFood(@RequestParam Long id) throws Exception {

        ResponseDTO<Boolean> response = new ResponseDTO<>();
        boolean isDelete = foodService.deleteFood(id);

        response.setPayload(isDelete);
        response.setMessage("Deleted Successfully");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseDTO<Food>> updateFoodAvailability(@PathVariable Long id) throws Exception {

        ResponseDTO<Food> response = new ResponseDTO<>();
        Food food = foodService.updateAvailability(id);

        response.setPayload(food);
        response.setMessage("Update Successfully");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }
}
