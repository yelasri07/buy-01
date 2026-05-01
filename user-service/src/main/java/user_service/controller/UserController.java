package user_service.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/users")
// @RequiredArgsConstructor
public class UserController {

    @GetMapping
    public String getMethodName() {
        return "Hello users!";
    }

    // @GetMapping
    // public String getProfile(@RequestParam String param) {
    // return new String();
    // }

    // @PutMapping("/me/avatar")
    // public String updateAvatar(@PathVariable String id, @RequestBody String
    // entity) {

    // return entity;
    // }

}
