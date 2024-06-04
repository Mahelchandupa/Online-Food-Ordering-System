package com.mahel.FoodOrderingService.service.impl;

import com.mahel.FoodOrderingService.dto.CartItemDTO;
import com.mahel.FoodOrderingService.exception.BadRequestException;
import com.mahel.FoodOrderingService.model.Cart;
import com.mahel.FoodOrderingService.model.CartItem;
import com.mahel.FoodOrderingService.model.Food;
import com.mahel.FoodOrderingService.model.User;
import com.mahel.FoodOrderingService.repository.CartItemRepository;
import com.mahel.FoodOrderingService.repository.CartRepository;
import com.mahel.FoodOrderingService.service.CartService;
import com.mahel.FoodOrderingService.service.FoodService;
import com.mahel.FoodOrderingService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private FoodService foodService;

    @Override
    public CartItem addItemToCart(CartItemDTO cartItemDTO, String jwt) throws Exception {

        User user = userService.userByToken(jwt);
        Food food = foodService.findFoodById(user.getId());

        Cart cart = cartRepository.findByCustomerId(user.getId());

        for (CartItem cartItem : cart.getCartItems()) {
            if ( cartItem.getFood().equals(food)){
               int newQuantity = cartItem.getQuantity() + cartItemDTO.getQuantity();
               return updateCartItemQuantity(cartItem.getId(), newQuantity);
            }
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setFood(food);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(cartItemDTO.getQuantity());
        newCartItem.setIngredients(cartItemDTO.getIngredients());
        newCartItem.setTotalPrice(cartItemDTO.getQuantity() * food.getPrice());

        CartItem savedCartItem = cartItemRepository.save(newCartItem);

        cart.getCartItems().add(savedCartItem);

        return savedCartItem;
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {

        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);

        if (cartItem.isEmpty()) {
            throw new BadRequestException("Cart Item Not Found");
        }

        CartItem cartItem1 = cartItem.get();
        cartItem1.setQuantity(quantity);

        cartItem1.setTotalPrice(cartItem1.getFood().getPrice() * quantity);

        return cartItemRepository.save(cartItem1);
    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {

        User user = userService.userByToken(jwt);

        Cart cart = cartRepository.findByCustomerId(user.getId());

        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (cartItemOptional.isEmpty()) {
            throw new BadRequestException("Cart Item Not Found");
        }

        CartItem item = cartItemOptional.get();

        cart.getCartItems().remove(item);

        return cartRepository.save(cart);
    }

    @Override
    public Long calculateTotal(Cart cart) throws Exception {

        long total = 0L;

        for (CartItem cartItem : cart.getCartItems()) {
            total += cartItem.getFood().getPrice() * cartItem.getQuantity();
        }

        return total;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {

        Optional<Cart> optionalCart = cartRepository.findById(id);
        if (optionalCart.isEmpty()) {
            throw new BadRequestException("Cart Not Found With Id " + id);
        }

        return optionalCart.get();
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {

        Cart cart = cartRepository.findByCustomerId(userId);
        cart.setTotal(calculateTotal(cart));

        return cart;
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {

        Cart cart = findCartByUserId(userId);
        cart.getCartItems().clear();

        return cartRepository.save(cart);
    }
}
