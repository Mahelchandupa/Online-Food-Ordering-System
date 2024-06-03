package com.mahel.FoodOrderingService.controller;

import com.mahel.FoodOrderingService.dto.IngredientCategoryDTO;
import com.mahel.FoodOrderingService.dto.IngredientItemDTO;
import com.mahel.FoodOrderingService.dto.response.ResponseDTO;
import com.mahel.FoodOrderingService.model.IngredientCategory;
import com.mahel.FoodOrderingService.model.IngredientsItem;
import com.mahel.FoodOrderingService.service.IngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin/ingredients")
public class IngredientsController {

    @Autowired
    private IngredientsService ingredientsService;

    @PostMapping("/category")
    public ResponseEntity<ResponseDTO<IngredientCategory>> createIngredientCategory(@RequestBody IngredientCategoryDTO ingredientCategoryDTO) throws Exception {

        ResponseDTO<IngredientCategory> response = new ResponseDTO<>();
        IngredientCategory ingredientCategory = ingredientsService.createIngredientCategory(ingredientCategoryDTO.getName(), ingredientCategoryDTO.getRestaurantId());

        response.setPayload(ingredientCategory);
        response.setMessage("Ingredient Category Added Successfully");
        response.setHttpStatus(HttpStatus.CREATED);
        response.setCode("201");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PostMapping
    public ResponseEntity<ResponseDTO<IngredientsItem>> createIngredientItem(@RequestBody IngredientItemDTO ingredientItemDTO) throws Exception {

        ResponseDTO<IngredientsItem> response = new ResponseDTO<>();
        IngredientsItem ingredientsItem = ingredientsService.createIngredientItem(ingredientItemDTO.getRestaurantId(), ingredientItemDTO.getName(), ingredientItemDTO.getCategoryId());

        response.setPayload(ingredientsItem);
        response.setMessage("Ingredient Item Added Successfully");
        response.setHttpStatus(HttpStatus.CREATED);
        response.setCode("201");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PostMapping("/{id}/stock")
    public ResponseEntity<ResponseDTO<IngredientsItem>> updateIngredientStock(@PathVariable Long id) throws Exception {

        ResponseDTO<IngredientsItem> response = new ResponseDTO<>();
        IngredientsItem ingredientsItem = ingredientsService.updateStock(id);

        response.setPayload(ingredientsItem);
        response.setMessage("Success");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @GetMapping("/restaurant/{id}")
    public ResponseEntity<ResponseDTO<List<IngredientsItem>>> getRestaurantIngredient(@PathVariable Long id) {

        ResponseDTO<List<IngredientsItem>> response = new ResponseDTO<>();
        List<IngredientsItem> items = ingredientsService.findRestaurantIngredients(id);

        response.setPayload(items);
        response.setMessage("Success");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @GetMapping("/restaurant/{id}/category")
    public ResponseEntity<ResponseDTO<List<IngredientCategory>>> getRestaurantIngredientCategory(@PathVariable Long id) throws Exception {

        ResponseDTO<List<IngredientCategory>> response = new ResponseDTO<>();
        List<IngredientCategory> categories = ingredientsService.findIngredientCategoryByRestaurantId(id);

        response.setPayload(categories);
        response.setMessage("Success");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }
}
