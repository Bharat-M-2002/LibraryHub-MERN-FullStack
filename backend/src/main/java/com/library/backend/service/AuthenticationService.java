package com.library.backend.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.library.backend.model.User;
import com.library.backend.repository.UserRepository;
import com.library.backend.security.JwtAuthenticationResponse;
import com.library.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @Value("${google.client-id}")
    private String googleClientId;

    // =========================
    // LOCAL SIGNUP
    // =========================
    public JwtAuthenticationResponse signup(String email, String password) {

        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("USER");

        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user.getEmail());

        return new JwtAuthenticationResponse(
                jwtToken,
                user.getEmail(),
                "ROLE_USER"
        );
    }

    // =========================
    // LOCAL LOGIN
    // =========================
    public JwtAuthenticationResponse login(String email, String password) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        String jwtToken = jwtService.generateToken(authentication.getName());

        return new JwtAuthenticationResponse(
                jwtToken,
                authentication.getName(),
                authentication.getAuthorities().iterator().next().getAuthority()
        );
    }

    // =========================
    // GOOGLE LOGIN
    // =========================
    public JwtAuthenticationResponse authenticateWithGoogle(String idTokenString) {

        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(),
                    JacksonFactory.getDefaultInstance()
            )
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);

            if (idToken == null) {
                throw new RuntimeException("Invalid Google ID token");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();

            String email = payload.getEmail();
            Boolean emailVerified = payload.getEmailVerified();

            if (!Boolean.TRUE.equals(emailVerified)) {
                throw new RuntimeException("Email not verified by Google");
            }

            User user = userRepository.findByEmail(email)
                    .orElseGet(() -> {
                        User newUser = new User();
                        newUser.setEmail(email);
                        newUser.setRole("USER");
                        return userRepository.save(newUser);
                    });

            String jwtToken = jwtService.generateToken(user.getEmail());

            return new JwtAuthenticationResponse(
                    jwtToken,
                    user.getEmail(),
                    "ROLE_" + user.getRole()
            );

        } catch (Exception e) {
            throw new RuntimeException("Google authentication failed", e);
        }
    }
}
