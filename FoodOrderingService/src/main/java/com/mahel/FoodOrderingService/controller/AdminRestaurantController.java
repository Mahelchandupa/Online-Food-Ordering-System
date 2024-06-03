package com.mahel.FoodOrderingService.controller;

import com.mahel.FoodOrderingService.dto.response.ResponseDTO;
import com.mahel.FoodOrderingService.model.Restaurant;
import com.mahel.FoodOrderingService.model.User;
import com.mahel.FoodOrderingService.service.RestaurantService;
import com.mahel.FoodOrderingService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin/restaurants")
public class AdminRestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @PostMapping()
    public ResponseEntity<ResponseDTO<Restaurant>> createRestaurant(
            @RequestBody Restaurant res,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        ResponseDTO<Restaurant> response = new ResponseDTO<>();

        User user = userService.userByToken(jwt);
        Restaurant restaurant = restaurantService.createRestaurant(res, user);

        response.setPayload(restaurant);
        response.setMessage("Restaurant Created");
        response.setHttpStatus(HttpStatus.CREATED);
        response.setCode("201");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseDTO<Restaurant>> updateRestaurant(@RequestBody Restaurant res, @PathVariable Long id) {

        ResponseDTO<Restaurant> response = new ResponseDTO<>();
        Restaurant restaurant = restaurantService.updateRestaurant(id, res);

        response.setPayload(restaurant);
        response.setMessage("Restaurant Details Update Successfully");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO<Boolean>> deleteRestaurant(@PathVariable Long id) {

        ResponseDTO<Boolean> response = new ResponseDTO<>();

        Boolean res = restaurantService.deleteRestaurant(id);

        response.setPayload(res);
        response.setMessage("Restaurant Delete Successfully");
        response.setHttpStatus(HttpStatus.NO_CONTENT);
        response.setCode("204");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ResponseDTO<Restaurant>> updateRestaurantStatus(@PathVariable Long id) {

        ResponseDTO<Restaurant> response = new ResponseDTO<>();
        Restaurant restaurant = restaurantService.updateStatus(id);

        response.setPayload(restaurant);
        response.setMessage("Update Successfully");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<ResponseDTO<List<Restaurant>>> findRestaurantByOwner(@RequestHeader("Authorization") String jwt) throws Exception {

        ResponseDTO<List<Restaurant>> response = new ResponseDTO<>();
        User user = userService.userByToken(jwt);

        List<Restaurant> restaurants = restaurantService.findRestaurantByOwnerId(user.getId());

        response.setPayload(restaurants);
        response.setMessage("Successful");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }
}
