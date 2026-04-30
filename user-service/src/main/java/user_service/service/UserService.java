package user_service.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import user_service.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    
}
