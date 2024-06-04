package com.mahel.FoodOrderingService.service.impl;

import com.mahel.FoodOrderingService.dto.OrderDTO;
import com.mahel.FoodOrderingService.exception.BadRequestException;
import com.mahel.FoodOrderingService.model.*;
import com.mahel.FoodOrderingService.repository.*;
import com.mahel.FoodOrderingService.service.CartService;
import com.mahel.FoodOrderingService.service.OrderService;
import com.mahel.FoodOrderingService.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CartService cartService;

    @Override
    public Order createOrder(OrderDTO orderDTO, User user) throws Exception {

        Address shippingAddress = orderDTO.getDeliveryAddress();

        Address savedAddress = addressRepository.save(shippingAddress);

        if (!user.getAddresses().contains(savedAddress)) {
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }

        Restaurant restaurant = restaurantService.findById(orderDTO.getRestaurantId());

        Order createdOrder = new Order();
        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setRestaurant(restaurant);

        Cart cart = cartService.findCartByUserId(user.getId());

        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cart.getCartItems()) {

            OrderItem orderItem = new OrderItem();

            orderItem.setFood(cartItem.getFood());
            orderItem.setIngredients(cartItem.getIngredients());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotalPrice());

            OrderItem saveOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(saveOrderItem);
        }

        Long totalPrice = cartService.calculateTotal(cart);

        createdOrder.setOrderItems(orderItems);
        createdOrder.setTotalPrice(totalPrice);

        Order savedOrder = orderRepository.save(createdOrder);

        restaurant.getOrders().add(savedOrder);

        return createdOrder;
    }

    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {

        Order order = findOrderById(orderId);

        if (orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED") || orderStatus.equals("COMPLETED") || orderStatus.equals("PENDING")) {

            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
        }

        throw new BadRequestException("Please Select a Valid Order Status");
    }

    @Override
    public boolean canselOrder(Long orderId) throws Exception {

        Order order = findOrderById(orderId);

        if (order != null) {
            orderRepository.deleteById(orderId);
            return true;
        }
        return false;
    }

    @Override
    public List<Order> getUserOrders(Long userId) throws Exception {
        return orderRepository.findByCustomerId(userId);
    }

    @Override
    public List<Order> getRestaurantOrders(Long restaurantId, String orderStatus) throws Exception {
       List<Order> orders =  orderRepository.findByRestaurantId(restaurantId);

       if (orderStatus != null) {
           orders = orders.stream().filter(order -> order.getOrderStatus().equals(orderStatus)).collect(Collectors.toList());
       }

       return orders;
    }

    @Override
    public Order findOrderById(Long orderId) throws Exception {

        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (optionalOrder.isEmpty()) {
            throw new BadRequestException("Order Not Found");
        }

        return optionalOrder.get();
    }
}
