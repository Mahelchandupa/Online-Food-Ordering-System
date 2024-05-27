package com.mahel.FoodOrderingService.service;

import com.mahel.FoodOrderingService.dto.UserDTO;
import com.mahel.FoodOrderingService.model.User;

public interface UserService {

    public User registerUser(UserDTO userDTO) throws Exception;
}
