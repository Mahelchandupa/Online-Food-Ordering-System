package com.mahel.FoodOrderingService.service.impl;

import com.mahel.FoodOrderingService.dto.RestaurantDTO;
import com.mahel.FoodOrderingService.exception.BadRequestException;
import com.mahel.FoodOrderingService.model.Address;
import com.mahel.FoodOrderingService.model.Restaurant;
import com.mahel.FoodOrderingService.model.User;
import com.mahel.FoodOrderingService.repository.AddressRepository;
import com.mahel.FoodOrderingService.repository.RestaurantRepository;
import com.mahel.FoodOrderingService.repository.UserRepository;
import com.mahel.FoodOrderingService.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Restaurant createRestaurant(Restaurant restaurant, User user) {

        if (restaurant.getName() == null) {
            throw new BadRequestException("");
        }

        if (restaurant.getDescription() == null) {
            throw new BadRequestException("");
        }

        if (restaurant.getOwner() == null) {
            throw new BadRequestException("");
        }

        Address address = addressRepository.save(restaurant.getAddress());

        Restaurant restaurant1 = new Restaurant();

        restaurant1.setAddress(address);
        restaurant1.setName(restaurant.getName());
        restaurant1.setCategories(restaurant.getCategories());
        restaurant1.setDescription(restaurant.getDescription());
        restaurant1.setFoods(restaurant.getFoods());
        restaurant1.setImages(restaurant.getImages());
        restaurant1.setOpeningHours(restaurant.getOpeningHours());
        restaurant1.setContactInformation(restaurant.getContactInformation());
        restaurant1.setCuisineType(restaurant.getCuisineType());
        restaurant1.setIngredientCategories(restaurant.getIngredientCategories());
        restaurant1.setRegistrationDate(LocalDateTime.now());
        restaurant1.setOwner(user);

        return restaurantRepository.save(restaurant1);
    }

    @Override
    public Restaurant updateRestaurant(Long id, Restaurant restaurant) {

        Optional<Restaurant> existingRestaurantOpt = restaurantRepository.findById(id);

        if (existingRestaurantOpt.isEmpty()) {
            throw new BadRequestException("Can not find Restaurant");
        }

        Restaurant existingRestaurant = existingRestaurantOpt.get();

        existingRestaurant.setName(restaurant.getName());
        existingRestaurant.setDescription(restaurant.getDescription());
        existingRestaurant.setCuisineType(restaurant.getCuisineType());
        existingRestaurant.setAddress(restaurant.getAddress());
        existingRestaurant.setContactInformation(restaurant.getContactInformation());
        existingRestaurant.setOpeningHours(restaurant.getOpeningHours());
        existingRestaurant.setImages(restaurant.getImages());
        existingRestaurant.setOpen(restaurant.isOpen());

        return restaurantRepository.save(existingRestaurant);
    }

    @Override
    public Boolean deleteRestaurant(Long id) {

        Optional<Restaurant> restaurant = restaurantRepository.findById(id);

        if (restaurant.isEmpty()) {
            throw new BadRequestException("Can not Find Restaurant With Id " + id);
        }

        restaurantRepository.delete(restaurant.get());

        return true;
    }

    @Override
    public List<Restaurant> getAllRestaurant() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant updateStatus(Long id) {

        Restaurant restaurant = findById(id);

        restaurant.setOpen(!restaurant.isOpen());

        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant findById(Long id) {

        Optional<Restaurant> restaurant = restaurantRepository.findById(id);

        if (restaurant.isEmpty()) {
            throw new BadRequestException("Can not Find Restaurant With Id " + id);
        }

        return restaurant.get();
    }

    @Override
    public RestaurantDTO addToFavorites(Long restaurantId, User user) {

        Restaurant restaurant = findRestaurantByOwnerId(restaurantId);

        RestaurantDTO restaurantDTO = new RestaurantDTO();
        restaurantDTO.setDescription(restaurant.getDescription());
        restaurantDTO.setImages(restaurant.getImages());
        restaurantDTO.setTitle(restaurant.getName());
        restaurantDTO.setId(restaurant.getId());

        if (user.getFavorites().contains(restaurantDTO)) {
            user.getFavorites().remove(restaurantDTO);
        } else {
            user.getFavorites().add(restaurantDTO);
        }
        userRepository.save(user);

        return restaurantDTO;
    }

    @Override
    public Restaurant findRestaurantByOwnerId(Long id) {

        Restaurant restaurant = restaurantRepository.findByOwnerId(id);

        if (restaurant == null) {
            throw new BadRequestException("Restaurant Can not found By Owner Id " + id);
        }

        return restaurant;
    }
}
