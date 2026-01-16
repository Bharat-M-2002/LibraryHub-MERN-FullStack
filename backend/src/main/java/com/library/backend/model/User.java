package com.library.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private String id;

    // =====================
    // CORE IDENTITY
    // =====================
    private String email;

    /**
     * BCrypt hash.
     * Nullable for OAuth users (Google).
     */
    private String password;

    /**
     * USER / ADMIN
     * (kept as String for backward compatibility)
     */
    private String role;

    // =====================
    // AUTH PROVIDER (NEW)
    // =====================

    /**
     * LOCAL | GOOGLE
     * Defaults to LOCAL for existing users
     */
    private String provider;

    /**
     * Provider-specific unique ID
     * For Google → "sub" claim
     */
    private String providerId;

    // =====================
    // GOOGLE PROFILE DATA (FREE)
    // =====================

    private String fullName;
    private String givenName;
    private String familyName;
    private String profileImage;
    private String locale;
    private Boolean emailVerified;

    // =====================
    // METADATA
    // =====================
    private Instant createdAt;
}
