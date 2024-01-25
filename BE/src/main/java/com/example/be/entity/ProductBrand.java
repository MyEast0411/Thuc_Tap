package com.example.be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_brand")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(Product_Brand_Id.class)
public class ProductBrand {

    @Id
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product_id;

    @Id
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand_id;
}
