package com.mahel.FoodOrderingService.enums;

public enum UserRole {

    ROLE_CUSTOMER("Customer"),

    ROLE_RESTAURANT_OWNER("Restaurant Owner"),

    ROLE_ADMIN("Admin");

    private String value;

    UserRole(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
