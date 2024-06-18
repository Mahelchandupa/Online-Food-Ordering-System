package com.mahel.FoodOrderingService.controller;

import com.mahel.FoodOrderingService.config.JwtProvider;
import com.mahel.FoodOrderingService.dto.UserDTO;
import com.mahel.FoodOrderingService.model.User;
import com.mahel.FoodOrderingService.dto.JWTResponseDTO;
import com.mahel.FoodOrderingService.dto.response.ResponseDTO;
import com.mahel.FoodOrderingService.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO<JWTResponseDTO>> registerUser(@RequestBody UserDTO userDTO) throws Exception {

        ResponseDTO<JWTResponseDTO> response = new ResponseDTO<>();

        User user = userService.registerUser(userDTO);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        JWTResponseDTO jwtResponseDTO = new JWTResponseDTO();
        jwtResponseDTO.setJwt(jwt);
        jwtResponseDTO.setEmail(user.getEmail());
        jwtResponseDTO.setRole(user.getRole());
        jwtResponseDTO.setUserName(user.getFullName());

        response.setPayload(jwtResponseDTO);
        response.setMessage("Registered Successfully");
        response.setHttpStatus(HttpStatus.CREATED);
        response.setCode("201");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO<JWTResponseDTO>> loginUser(@RequestBody UserDTO userDTO) throws Exception {

        ResponseDTO<JWTResponseDTO> response = new ResponseDTO<>();

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        User user = userService.userByEmail(userDTO.getEmail());

        JWTResponseDTO jwtResponseDTO = new JWTResponseDTO();
        jwtResponseDTO.setJwt(jwt);
        jwtResponseDTO.setEmail(userDTO.getEmail());
        jwtResponseDTO.setUserName(user.getFullName());
        jwtResponseDTO.setRole(user.getRole());

        response.setPayload(jwtResponseDTO);
        response.setMessage("Login Successful");
        response.setCode("200");
        response.setHttpStatus(HttpStatus.OK);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @GetMapping("email/")
    public ResponseEntity<ResponseDTO<UserDTO>> getUserByEmail(@RequestBody String email) throws Exception {

        ResponseDTO<UserDTO> response = new ResponseDTO<>();

        UserDTO userDTO = modelMapper.map(userService.userByEmail(email), UserDTO.class);

        response.setPayload(userDTO);
        response.setMessage("Success");
        response.setCode("200");
        response.setHttpStatus(HttpStatus.OK);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @GetMapping("/profile")
    public ResponseEntity<ResponseDTO<UserDTO>> userByToken(@RequestHeader("Authorization") String token) throws Exception {

        ResponseDTO<UserDTO> response = new ResponseDTO<>();
        UserDTO userDTO = modelMapper.map(userService.userByToken(token), UserDTO.class);

        response.setPayload(userDTO);
        response.setMessage("Success");
        response.setCode("200");
        response.setHttpStatus(HttpStatus.OK);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }
}
