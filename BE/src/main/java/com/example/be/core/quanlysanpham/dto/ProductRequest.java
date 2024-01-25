package com.example.be.core.quanlysanpham.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private Long id;
    private String productName;
    private String color;
    private Double sellPrice;
    private Double originPrice;
    private Integer quantity;
    private String brandName;
    private String subCate;
    private String status;
    private String description;
}
