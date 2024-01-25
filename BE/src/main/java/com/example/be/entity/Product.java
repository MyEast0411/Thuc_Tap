package com.example.be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "product")
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "color")
    private String color;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "sell_price")
    private Double sellPrice;

    @Column(name = "origin_price")
    private Double originPrice;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "subcate_id")
    private Sub_Category subCateId;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status statusId;

}
