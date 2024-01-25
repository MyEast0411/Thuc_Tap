package com.example.be.core.quanlysanpham.controller;

import com.example.be.core.quanlysanpham.dto.ProductRequest;
import com.example.be.core.quanlysanpham.dto.ProductResponse;
import com.example.be.core.quanlysanpham.dto.ProductSearchRequest;
import com.example.be.core.quanlysanpham.service.ProductService;
import com.example.be.repositories.BrandRepository;
import com.example.be.repositories.CategoryRepository;
import com.example.be.repositories.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/findAllProduct")
    public ResponseEntity findAllProduct() {
        try {
            List<ProductResponse> list = productService.findAllProduct();
            return ResponseEntity.ok(list);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @GetMapping("/findAllBrand")
    public ResponseEntity findAllBrand() {
        try {
            return ResponseEntity.ok(brandRepository.findAll());
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @GetMapping("/findAllCategory")
    public ResponseEntity findAllCategory() {
        try {
            return ResponseEntity.ok(categoryRepository.findAll());
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @GetMapping("/findAllSubCate")
    public ResponseEntity findAllSubCate() {
        try {
            return ResponseEntity.ok(subCategoryRepository.findAll());
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @GetMapping("/findProductById/{id}")
    public ResponseEntity findProductById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(productService.findProductById(id));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERROR");
        }
    }
    @PostMapping("/filter")
    public ResponseEntity addProduct(@RequestBody ProductSearchRequest request) {
        try {
            if(request.getName().equals("")) {
                request.setName(null);
            }
            if( request.getStatus() != null && request.getStatus() == 0l) {
                request.setStatus(null);
            }
            if( request.getCategory() != null && request.getCategory() == 0l) {
                request.setCategory(null);
            }
            if( request.getBrand() != null && request.getBrand() == 0l) {
                request.setBrand(null);
            }
            return ResponseEntity.ok(productService.filter(request));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERROR");
        }
    }
    @PostMapping("/addProduct")
    public ResponseEntity addProduct(@RequestBody ProductRequest request) {
        try {
            return ResponseEntity.ok(productService.addProduct(request));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @PutMapping("/updateProduct")
    public ResponseEntity updateProduct(@RequestBody ProductRequest request) {
        try {
            return ResponseEntity.ok(productService.updateProduct(request));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(productService.deleteProduct(id));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERROR");
        }
    }


}
