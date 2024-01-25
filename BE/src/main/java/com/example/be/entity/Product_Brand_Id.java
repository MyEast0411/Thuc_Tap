package com.example.be.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product_Brand_Id {
    private Long product_id;

    private Long brand_id;
}
