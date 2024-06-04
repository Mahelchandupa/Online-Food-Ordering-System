package com.mahel.FoodOrderingService.controller;

import com.mahel.FoodOrderingService.dto.response.ResponseDTO;
import com.mahel.FoodOrderingService.model.Order;
import com.mahel.FoodOrderingService.service.OrderService;
import com.mahel.FoodOrderingService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin/orders")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @GetMapping("/restaurant/{id}")
    public ResponseEntity<ResponseDTO<List<Order>>> getOrderHistory(@PathVariable Long id, @RequestParam(required = false) String order_status) throws Exception {

        ResponseDTO<List<Order>> response = new ResponseDTO<>();

        List<Order> orders = orderService.getRestaurantOrders(id, order_status);

        response.setPayload(orders);
        response.setMessage("Success");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PutMapping("/{orderId}/{orderStatus}")
    public ResponseEntity<ResponseDTO<Order>> updateOrderStatus(@PathVariable Long orderId, @PathVariable String orderStatus) throws Exception {

        ResponseDTO<Order> response = new ResponseDTO<>();

        Order order = orderService.updateOrder(orderId, orderStatus);

        response.setPayload(order);
        response.setMessage("Success");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }
}

