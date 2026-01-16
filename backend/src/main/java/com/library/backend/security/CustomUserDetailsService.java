package com.library.backend.security;

import com.library.backend.model.User;
import com.library.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + email)
                );

        System.out.println("========================================");
        System.out.println("👤 USER LOADED FROM DATABASE");
        System.out.println("Email: " + user.getEmail());
        System.out.println("Password hash: " + user.getPassword().substring(0, 20) + "...");
        System.out.println("Role: " + user.getRole());
        System.out.println("========================================");

        return new CustomUserDetails(user);
    }
}