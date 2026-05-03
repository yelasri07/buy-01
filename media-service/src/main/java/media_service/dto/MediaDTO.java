package media_service.dto;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MediaDTO {

    public static record MediaInput(
            String target,
            @JsonProperty("targer_id") String targetId,
            MultipartFile file) {
    }

}
