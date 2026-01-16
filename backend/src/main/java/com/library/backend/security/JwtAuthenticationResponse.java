package com.library.backend.security;

public record JwtAuthenticationResponse(
        String token,
        String email,
        String role
) {
}
