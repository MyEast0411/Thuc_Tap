package com.example.be.core.quanlysanpham.service.impl;

import com.example.be.core.quanlysanpham.dto.ProductRequest;
import com.example.be.core.quanlysanpham.dto.ProductResponse;
import com.example.be.core.quanlysanpham.dto.ProductSearchRequest;
import com.example.be.core.quanlysanpham.dto.ProductSearchResponse;
import com.example.be.core.quanlysanpham.service.ProductService;
import com.example.be.entity.Product;
import com.example.be.entity.ProductBrand;
import com.example.be.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductBrandRepository productBrandRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<ProductResponse> findAllProduct() {
        List<ProductResponse> list = new ArrayList<>();
        for (Product product : productRepository.findAll()) {
            for (ProductBrand productBrand : productBrandRepository.findAll()) {
                if(productBrand.getProduct_id().getId() == product.getId()) {
                    ProductResponse productResponse = ProductResponse.builder()
                            .id(product.getId())
                            .productName(product.getProductName())
                            .subCate(product.getSubCateId().getSubCateName())
                            .brandName(productBrand.getBrand_id().getBrandName())
                            .sellPrice(product.getSellPrice())
                            .status(product.getStatusId().getStatusName())
                            .build();
                    list.add(productResponse);
                }
            }

        }
        return list;
    }

    @Override
    public Product addProduct(ProductRequest productRequest) {
        try {
            Product product = Product.builder()
                    .productName(productRequest.getProductName())
                    .color(productRequest.getColor())
                    .sellPrice(productRequest.getSellPrice())
                    .originPrice(productRequest.getOriginPrice())
                    .statusId(statusRepository.findById(1l).get())
                    .description("")
                    .quantity(productRequest.getQuantity())
                    .subCateId(subCategoryRepository.findById(Long.parseLong(productRequest.getSubCate())).get())
                    .build();

            ProductBrand productBrand = new ProductBrand();
            productBrand.setProduct_id(productRepository.save(product));
            productBrand.setBrand_id(brandRepository.save(brandRepository.findById(Long.parseLong(productRequest.getBrandName())).get()));

            productBrandRepository.save(productBrand);

            return productBrand.getProduct_id();
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public ProductResponse findProductById(Long id) {
        try {
            Product product = productRepository.findById(id).get();
            for (ProductBrand productBrand : productBrandRepository.findAll()) {
                if(product.getId() == productBrand.getProduct_id().getId()) {
                    ProductResponse productResponse = ProductResponse.builder()
                            .id(product.getId())
                            .productName(product.getProductName())
                            .color(product.getColor())
                            .quantity(product.getQuantity())
                            .sellPrice(product.getSellPrice())
                            .originPrice(product.getOriginPrice())
                            .brandName(productBrand.getBrand_id().getBrandName())
                            .category(categoryRepository.findById(product.getSubCateId().getCate_id().getId()).get().getCateName())
                            .subCate(product.getSubCateId().getSubCateName())
                            .status(product.getStatusId().getStatusName())
                            .description(product.getDescription())
                            .build();
                    return productResponse;
                }
            }
            return null;
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Product updateProduct(ProductRequest productRequest) {
        try {
            Product product = Product.builder()
                    .id(productRequest.getId())
                    .productName(productRequest.getProductName())
                    .color(productRequest.getColor())
                    .sellPrice(productRequest.getSellPrice())
                    .originPrice(productRequest.getOriginPrice())
                    .statusId(statusRepository.findStatusByStatusName(productRequest.getStatus()))
                    .description(productRequest.getDescription())
                    .quantity(productRequest.getQuantity())
                    .subCateId(subCategoryRepository.findSub_CategoryBySubCateName(productRequest.getSubCate()))
                    .build();

            for (ProductBrand productBrand : productBrandRepository.findAll()) {
                if(productBrand.getProduct_id().getId() == product.getId()) {
                    productBrand.setBrand_id(brandRepository.findBrandByBrandName(productRequest.getBrandName()));
                    productBrandRepository.save(productBrand);
                }
            }

            return productRepository.save(product);
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean deleteProduct(Long id) {
        try {
            productRepository.delete(productRepository.findById(id).get());
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<ProductSearchResponse> filter(ProductSearchRequest productSearchRequest) {
        try {
            return productRepository.getSearch(productSearchRequest);
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
