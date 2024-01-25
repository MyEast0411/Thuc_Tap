package com.example.be.core.quanlysanpham.dto;

public interface ProductSearchResponse {
    String getProductId();
    String getProductName();
    String getColor();
    Integer getQuantity();
    Double getSellPrice();
    Double getOriginPrice();
    String getBrandName();
    String getSubCate();
    String getStatus();
}
