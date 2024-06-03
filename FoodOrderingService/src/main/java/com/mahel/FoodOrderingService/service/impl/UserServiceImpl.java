package com.mahel.FoodOrderingService.service.impl;

import com.mahel.FoodOrderingService.config.JwtProvider;
import com.mahel.FoodOrderingService.repository.CartRepository;
import com.mahel.FoodOrderingService.dto.UserDTO;
import com.mahel.FoodOrderingService.model.Cart;
import com.mahel.FoodOrderingService.model.User;
import com.mahel.FoodOrderingService.repository.UserRepository;
import com.mahel.FoodOrderingService.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User registerUser(UserDTO userDTO) throws Exception {

        User user = modelMapper.map(userDTO, User.class);

        User isUser = userRepository.findByEmail(user.getEmail());
        if (isUser != null) {
            throw new Exception("Email Already Registered");
        }

        User newUser= new User();
        newUser.setEmail(user.getEmail());
        newUser.setFullName(user.getFullName());
        newUser.setRole(user.getRole());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(newUser);

        Cart cart = new Cart();
        cart.setCustomer(savedUser);

        cartRepository.save(cart);

        return savedUser;
    }

    @Override
    public User userByToken(String token) throws Exception {

        String email = jwtProvider.getEmailFromJwtToken(token);
        User user = userRepository.findByEmail(email);

        return user;
    }

    @Override
    public User userByEmail(String email) throws Exception {

         User user = userRepository.findByEmail(email);

        return user;
    }
}
