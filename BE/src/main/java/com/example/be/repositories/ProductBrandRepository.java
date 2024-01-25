package com.example.be.repositories;

import com.example.be.entity.ProductBrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductBrandRepository extends JpaRepository<ProductBrand, Long> {



}
