package product_service.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import product_service.repository.ProductRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductConsumerService {

    private final ProductRepository productRepository;
    
    @KafkaListener(topics = "delete-product", groupId = "productGroup")
    public void deleteProduct(String productId) {
        try {
            this.productRepository.deleteById(productId);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

}
