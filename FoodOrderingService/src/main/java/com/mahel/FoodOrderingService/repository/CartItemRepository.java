package com.mahel.FoodOrderingService.repository;

import com.mahel.FoodOrderingService.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
