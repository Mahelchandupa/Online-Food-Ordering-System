package com.mahel.FoodOrderingService.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name= "cart_id")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

    private int quantity;

    private Long totalPrice;

    private List<String> ingredients;
}
