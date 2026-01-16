package com.library.backend.controller;

import com.library.backend.security.JwtAuthenticationResponse;
import com.library.backend.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // ✅ IMPORTANT for Google login
public class AuthController {

    private final AuthenticationService authenticationService;

    // =========================
    // LOCAL SIGNUP
    // =========================
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        try {
            JwtAuthenticationResponse response =
                    authenticationService.signup(request.email(), request.password());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // =========================
    // LOCAL LOGIN
    // =========================
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            JwtAuthenticationResponse response =
                    authenticationService.login(request.email(), request.password());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
        }
    }

    // =========================
    // GOOGLE LOGIN (FIXED)
    // =========================
    @PostMapping("/google")
    public ResponseEntity<?> googleAuth(
            @RequestBody GoogleAuthRequest request
    ) {
        try {
            // ✅ request.idToken() is the GOOGLE ID TOKEN (JWT)
            JwtAuthenticationResponse response =
                    authenticationService.authenticateWithGoogle(request.idToken());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Google authentication failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }
}
