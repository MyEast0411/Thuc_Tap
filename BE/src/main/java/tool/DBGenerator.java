package tool;

import com.example.be.entity.*;
import com.example.be.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.example.be")
@EnableJpaRepositories(basePackages = "com.example.be.repositories")
public class DBGenerator implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductBrandRepository productBrandRepository;

    @Override
    public void run(String... args) throws Exception {
        // gender data category
        Category category1 = new Category();
        category1.setCateCode("#CATE1");
        category1.setCateName("Loại 1");
        category1.setId(categoryRepository.save(category1).getId());

        Category category2 = new Category();
        category2.setCateCode("#CATE2");
        category2.setCateName("Loại 2");
        category2.setId(categoryRepository.save(category2).getId());

        //gender data status
        Status status1 = new Status();
        status1.setStatusName("Còn hàng");
        status1.setId(statusRepository.save(status1).getId());

        Status status2 = new Status();
        status2.setStatusName("Hết hàng");
        status2.setId(statusRepository.save(status2).getId());

        //gender data subcate
        Sub_Category sub_category1 = new Sub_Category();
        sub_category1.setSubCateCode("#SUBCATE1");
        sub_category1.setSubCateName("Loại 1 - 1");
        sub_category1.setCate_id(category1);
        sub_category1.setId(subCategoryRepository.save(sub_category1).getId());

        Sub_Category sub_category2 = new Sub_Category();
        sub_category2.setSubCateCode("#SUBCATE2");
        sub_category2.setSubCateName("Loại 1 - 2");
        sub_category2.setCate_id(category1);
        sub_category2.setId(subCategoryRepository.save(sub_category2).getId());

        Sub_Category sub_category3 = new Sub_Category();
        sub_category3.setSubCateCode("#SUBCATE3");
        sub_category3.setSubCateName("Loại 2 - 1");
        sub_category3.setCate_id(category2);
        sub_category3.setId(subCategoryRepository.save(sub_category3).getId());

        Sub_Category sub_category4 = new Sub_Category();
        sub_category4.setSubCateCode("#SUBCATE4");
        sub_category4.setSubCateName("Loại 2 - 2");
        sub_category4.setCate_id(category2);
        sub_category4.setId(subCategoryRepository.save(sub_category4).getId());

        //gender data brand
        Brand brand1 = new Brand();
        brand1.setBrandName("Brand 1");
        brand1.setId(brandRepository.save(brand1).getId());

        Brand brand2 = new Brand();
        brand2.setBrandName("Brand 2");
        brand2.setId(brandRepository.save(brand2).getId());

        //gender data product
        Product product1 = new Product();
        product1.setProductName("Sản phẩm 1");
        product1.setColor("Green");
        product1.setQuantity(100);
        product1.setSellPrice(100.000);
        product1.setOriginPrice(130.000);
        product1.setDescription("Mô tả sản phẩm 1");
        product1.setStatusId(status1);
        product1.setSubCateId(sub_category1);
        product1.setId(productRepository.save(product1).getId());

        Product product2 = new Product();
        product2.setProductName("Sản phẩm 2");
        product2.setColor("Red");
        product2.setQuantity(30);
        product2.setSellPrice(200.000);
        product2.setOriginPrice(230.000);
        product2.setDescription("Mô tả sản phẩm 2");
        product2.setStatusId(status1);
        product2.setSubCateId(sub_category2);
        product2.setId(productRepository.save(product2).getId());

        Product product3 = new Product();
        product3.setProductName("Sản phẩm 3");
        product3.setColor("Blue");
        product3.setQuantity(11);
        product3.setSellPrice(400.000);
        product3.setOriginPrice(440.000);
        product3.setDescription("Mô tả sản phẩm 3");
        product3.setStatusId(status1);
        product3.setSubCateId(sub_category3);
        product3.setId(productRepository.save(product3).getId());

        Product product4 = new Product();
        product4.setProductName("Sản phẩm 4");
        product4.setColor("Yellow");
        product4.setQuantity(0);
        product4.setSellPrice(200.000);
        product4.setOriginPrice(220.000);
        product4.setDescription("Mô tả sản phẩm 4");
        product4.setStatusId(status2);
        product4.setSubCateId(sub_category4);
        product4.setId(productRepository.save(product4).getId());

        // gender data product_brand
        ProductBrand productBrand1 = new ProductBrand();
        productBrand1.setProduct_id(product1);
        productBrand1.setBrand_id(brand1);
        productBrandRepository.save(productBrand1);

        ProductBrand productBrand2 = new ProductBrand();
        productBrand2.setProduct_id(product2);
        productBrand2.setBrand_id(brand1);
        productBrandRepository.save(productBrand2);

        ProductBrand productBrand3 = new ProductBrand();
        productBrand3.setProduct_id(product3);
        productBrand3.setBrand_id(brand2);
        productBrandRepository.save(productBrand3);

        ProductBrand productBrand4 = new ProductBrand();
        productBrand4.setProduct_id(product4);
        productBrand4.setBrand_id(brand2);
        productBrandRepository.save(productBrand4);
    }

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBGenerator.class);
        ctx.close();
    }


}
