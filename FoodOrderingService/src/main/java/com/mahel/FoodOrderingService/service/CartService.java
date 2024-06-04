package com.mahel.FoodOrderingService.service;

import com.mahel.FoodOrderingService.dto.CartItemDTO;
import com.mahel.FoodOrderingService.model.Cart;
import com.mahel.FoodOrderingService.model.CartItem;

public interface CartService {

    public CartItem addItemToCart(CartItemDTO cartItemDTO, String jwt) throws Exception;

    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception;

    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception;

    public Long calculateTotal(Cart cart) throws Exception;

    public Cart findCartById(Long id) throws Exception;

    public Cart findCartByUserId(Long userId) throws Exception;

    public Cart clearCart(Long userId) throws Exception;
}
