package user_service.model.DTO;

import jakarta.validation.constraints.NotEmpty;
// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Size;
import lombok.Builder;

public class UserDTO {

    public static record AvatarInput(
            @NotEmpty(message = "User id cannot be empty") String userId,
            @NotEmpty(message = "Avatar url cannot be empty") String avatarUrl) {

    }

    @Builder
    public static record UserOutput(
            String id,
            String name,
            String email,
            String role,
            String avatarUrl) {
    }

}
