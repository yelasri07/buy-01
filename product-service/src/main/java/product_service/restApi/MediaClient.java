package product_service.restApi;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "media-service")
public interface MediaClient {

    @GetMapping("/media/images/products/{id}")
    public List<String> getProductMedia(@PathVariable("id") String productId);

}
