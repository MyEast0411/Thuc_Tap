package com.example.be.core.quanlysanpham.service;

import com.example.be.core.quanlysanpham.dto.ProductRequest;
import com.example.be.core.quanlysanpham.dto.ProductResponse;
import com.example.be.core.quanlysanpham.dto.ProductSearchRequest;
import com.example.be.core.quanlysanpham.dto.ProductSearchResponse;
import com.example.be.entity.Product;
import com.example.be.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProductService {
    List<ProductResponse> findAllProduct();
    Product addProduct(ProductRequest productRequest);

    ProductResponse findProductById(Long id);

    Product updateProduct(ProductRequest productRequest);

    Boolean deleteProduct(Long id);

    List<ProductSearchResponse> filter(ProductSearchRequest productSearchRequest);
}
