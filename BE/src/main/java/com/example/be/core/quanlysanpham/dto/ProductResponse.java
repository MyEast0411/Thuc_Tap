package com.example.be.core.quanlysanpham.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {
    private Long id;
    private String productName;
    private String color;
    private Integer quantity;
    private String brandName;
    private String subCate;
    private Double sellPrice;
    private Double originPrice;
    private String status;
    private String category;
    private String description;
}
