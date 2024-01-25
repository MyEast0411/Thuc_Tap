package com.example.be.core.quanlysanpham.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductSearchRequest {
    private String name;

    private Double price;

    private Long brand;

    private Long category;

    private Long status;
}
