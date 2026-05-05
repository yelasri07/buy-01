package user_service.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import user_service.model.DTO.UserDTO.AvatarInput;
import user_service.service.UserService;

import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public String getMethodName() {
        return "Hello users!";
    }

    @GetMapping("/me")
    public Map<String, Object> getProfile(@AuthenticationPrincipal String id) {
        return userService.getUser(id);
    }

    @PutMapping("/me")
    public Map<String, Object> updateAvatar(@RequestBody @Valid AvatarInput avatarInput) {
        return userService.updateAvatar(avatarInput);
    }

}
