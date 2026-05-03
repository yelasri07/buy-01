package media_service.service;

import java.io.IOException;

import org.apache.tika.Tika;
import org.springframework.web.multipart.MultipartFile;

import media_service.exception.BadRequestException;

public class FileValidator {
    private static final Tika TIKA = new Tika();

    public static void validateImage(MultipartFile file) {
        try {
            // Detect based on actual file content (magic bytes)
            String detectedType = TIKA.detect(file.getInputStream());
            
            if (!detectedType.startsWith("image/")) {
                throw new BadRequestException("Invalid file type. Only images are allowed.");
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not read file for validation", e);
        }
    }
}