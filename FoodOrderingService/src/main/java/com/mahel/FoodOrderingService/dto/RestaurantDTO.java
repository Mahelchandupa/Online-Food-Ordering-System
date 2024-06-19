package com.mahel.FoodOrderingService.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantDTO {

    private String title;

    @Column(length = 1000)
    private List<String> images;

    @Column(length = 1000)
    private String description;

    private Long id;

    private boolean open = false;
}
