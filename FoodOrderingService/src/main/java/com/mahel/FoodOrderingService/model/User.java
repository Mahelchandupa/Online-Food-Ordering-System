package com.mahel.FoodOrderingService.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mahel.FoodOrderingService.dto.RestaurantDTO;
import com.mahel.FoodOrderingService.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fullName;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_CUSTOMER;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer" ,orphanRemoval = true)
    private List<Order> orders;

    @ElementCollection
    private List<RestaurantDTO> favorites;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
    private List<Address> addresses;
}
