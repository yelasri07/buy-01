package product_service.kafka;

import java.util.Optional;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import product_service.model.Product;
import product_service.model.ProductStatus;
import product_service.repository.ProductRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductConsumerService {

    private final ProductRepository productRepository;

    @KafkaListener(topics = "update-product-status", groupId = "productGroup")
    public void deleteProduct(String productId) {
        try {
            Optional<Product> product = this.productRepository.findById(productId);

            if (product.isPresent()) {
                product.get().setStatus(ProductStatus.ACTIVE);
                this.productRepository.save(product.get());
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

}
