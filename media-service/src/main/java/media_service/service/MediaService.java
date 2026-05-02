package media_service.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import media_service.repository.MediaRepository;

@Service
@RequiredArgsConstructor
public class MediaService {

    private final MediaRepository mediaRepository;
    private String location = "upload-dir/products";

    public Map<String, Object> uploadMedia(MultipartFile media) {
        try {
            Path uploadPath = Paths.get(location);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            Path filePath = uploadPath.resolve(media.getOriginalFilename());
            try (FileOutputStream fos = new FileOutputStream(filePath.toString())) {
                byte[] bytes = media.getBytes();
                fos.write(bytes);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("message", "File uploaded: " + filePath.getFileName());
            return response;

        } catch (IOException | IllegalStateException e) {
            throw new InternalError("Upload failed: " + e.getMessage());
        }

    }

}
