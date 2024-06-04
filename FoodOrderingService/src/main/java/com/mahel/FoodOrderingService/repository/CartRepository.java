package com.mahel.FoodOrderingService.repository;

import com.mahel.FoodOrderingService.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Cart findByCustomerId(Long userId);
}
