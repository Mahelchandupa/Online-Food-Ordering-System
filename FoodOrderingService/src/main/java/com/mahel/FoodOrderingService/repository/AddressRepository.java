package com.mahel.FoodOrderingService.repository;

import com.mahel.FoodOrderingService.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
