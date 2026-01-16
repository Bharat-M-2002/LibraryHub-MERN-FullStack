package com.library.backend.dto;

import com.library.backend.model.User;
import lombok.Builder;

import java.time.Instant;

@Builder
public record MeResponse(
        String id,
        String email,
        String role,
        String provider,
        String fullName,
        String givenName,
        String familyName,
        String profileImage,
        Boolean emailVerified,
        Instant createdAt
) {
    public static MeResponse from(User user) {
        return MeResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .provider(user.getProvider())
                .fullName(user.getFullName())
                .givenName(user.getGivenName())
                .familyName(user.getFamilyName())
                .profileImage(user.getProfileImage())
                .emailVerified(user.getEmailVerified())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
