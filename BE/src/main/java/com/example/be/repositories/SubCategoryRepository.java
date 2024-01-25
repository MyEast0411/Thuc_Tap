package com.example.be.repositories;

import com.example.be.entity.Sub_Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubCategoryRepository extends JpaRepository<Sub_Category, Long> {
    Sub_Category findSub_CategoryBySubCateName(String subCateName);
}
