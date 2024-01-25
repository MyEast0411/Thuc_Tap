package com.example.be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "sub_category")
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Sub_Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sub_cate_code")
    private String subCateCode;

    @Column(name = "sub_cate_name")
    private String subCateName;

    @ManyToOne
    @JoinColumn(name = "cate_id")
    private Category cate_id;
}
