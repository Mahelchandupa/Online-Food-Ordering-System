package com.mahel.FoodOrderingService.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactInformation {

    private String email;

    private String mobile;

    private String twitter;

    private String instagram;

    private String facebook;
}
