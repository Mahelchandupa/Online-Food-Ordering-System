package com.mahel.FoodOrderingService.controller;

import com.mahel.FoodOrderingService.dto.response.ResponseDTO;
import com.mahel.FoodOrderingService.model.Category;
import com.mahel.FoodOrderingService.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/admin/category")
    public ResponseEntity<ResponseDTO<Category>> createCategory(@RequestBody Category category) {

        ResponseDTO<Category> response = new ResponseDTO<>();
        Category savedCategory = categoryService.createCategory(category.getName(), category.getRestaurant().getId());

        response.setPayload(savedCategory);
        response.setMessage("Category Added Successfully");
        response.setHttpStatus(HttpStatus.CREATED);
        response.setCode("201");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @GetMapping("/category/restaurant/{id}")
    public ResponseEntity<ResponseDTO<List<Category>>> getRestaurantCategory(@PathVariable Long id) throws Exception {

        ResponseDTO<List<Category>> response = new ResponseDTO<>();
        List<Category> categories = categoryService.findCategoryByRestaurantId(id);

        response.setPayload(categories);
        response.setMessage("Success");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<ResponseDTO<Category>> findByCategoryId(@PathVariable Long id) throws Exception {

        ResponseDTO<Category> response = new ResponseDTO<>();
        Category category = categoryService.findCategoryById(id);

        response.setPayload(category);
        response.setMessage("Success");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }
}
