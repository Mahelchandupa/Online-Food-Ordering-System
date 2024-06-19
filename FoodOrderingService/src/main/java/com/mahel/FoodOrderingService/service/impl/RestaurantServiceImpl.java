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
            throw new BadRequestException("Restaurant Name Required");
        }

        if (restaurant.getDescription() == null) {
            throw new BadRequestException("Restaurant Description Required");
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

        if (restaurant.getName() != null) {
            existingRestaurant.setName(restaurant.getName());
        }
        if (restaurant.getDescription() != null) {
            existingRestaurant.setDescription(restaurant.getDescription());
        }
        if (restaurant.getCuisineType() != null) {
            existingRestaurant.setCuisineType(restaurant.getCuisineType());
        }
        if (restaurant.getAddress() != null) {
            existingRestaurant.setAddress(restaurant.getAddress());
        }
        if (restaurant.getContactInformation() != null) {
            existingRestaurant.setContactInformation(restaurant.getContactInformation());
        }
        if (restaurant.getOpeningHours() != null) {
            existingRestaurant.setOpeningHours(restaurant.getOpeningHours());
        }
        if (restaurant.getImages() != null) {
            existingRestaurant.setImages(restaurant.getImages());
        }
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

        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(restaurantId);
        if (!optionalRestaurant.isPresent()) {
            throw new BadRequestException("Restaurant not found with id " + restaurantId);
        }

        Restaurant restaurant = optionalRestaurant.get();

        RestaurantDTO restaurantDTO = new RestaurantDTO();
        restaurantDTO.setDescription(restaurant.getDescription());
        restaurantDTO.setImages(restaurant.getImages());
        restaurantDTO.setTitle(restaurant.getName());
        restaurantDTO.setId(restaurantId);
        restaurantDTO.setOpen(restaurant.isOpen());

        boolean isFavorite = false;
        List<RestaurantDTO> favorites = user.getFavorites();
        for (RestaurantDTO favorite : favorites) {
            if (favorite.getId().equals(restaurantId)) {
                isFavorite = true;
                break;
            }
        }

        if (isFavorite) {
            favorites.removeIf(favorite -> favorite.getId().equals(restaurantId));
        } else {
            favorites.add(restaurantDTO);
        }

        userRepository.save(user);

        return restaurantDTO;
    }

    @Override
    public List<Restaurant> findRestaurantByOwnerId(Long id) {

        List<Restaurant> restaurants = restaurantRepository.findByOwnerId(id);

        if (restaurants == null) {
            throw new BadRequestException("Restaurants Can not found By Owner Id " + id);
        }

        return restaurants;
    }
}
