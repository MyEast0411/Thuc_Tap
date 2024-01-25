package com.example.be.repositories;

import com.example.be.core.quanlysanpham.dto.ProductSearchRequest;
import com.example.be.core.quanlysanpham.dto.ProductSearchResponse;
import com.example.be.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = """
                    select
                        p.id as productId,
                    	p.product_name as productName,
                    	p.color as color,
                    	p.quantity as quantity,
                    	p.sell_price as sellPrice,
                    	p.origin_price as originPrice,
                    	b.brand_name as brandName,
                    	sc.sub_cate_name as subCate,
                    	s.status_name as status
                    from
                    	brand b join product_brand pb on b.id = pb.brand_id
                    join product p on p.id = pb.product_id
                    join sub_category sc on p.subcate_id = sc.id
                    join status s on p.status_id = s.id
                    join category c on sc.cate_id = c.id
                   where
            	(:#{#productSearchRequest.name} IS NULL OR 
            	p.product_name like (%:#{#productSearchRequest.name}%) OR
            	b.brand_name like (%:#{#productSearchRequest.name}%)) AND
                (:#{#productSearchRequest.price} IS NULL OR
                p.sell_price <=:#{#productSearchRequest.price}) AND
                (:#{#productSearchRequest.brand} IS NULL OR
                b.id =:#{#productSearchRequest.brand}) AND
                (:#{#productSearchRequest.category} IS NULL OR
                c.id =:#{#productSearchRequest.category}) AND
                (:#{#productSearchRequest.status} IS NULL OR
                s.id =:#{#productSearchRequest.status})
            """, nativeQuery = true)
    List<ProductSearchResponse> getSearch(ProductSearchRequest productSearchRequest);
}
