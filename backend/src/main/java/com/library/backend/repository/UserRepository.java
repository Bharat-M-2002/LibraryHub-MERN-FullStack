package com.library.backend.repository;

import com.library.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    // Existing – still primary lookup
    Optional<User> findByEmail(String email);

    // New – required for OAuth identity resolution
    Optional<User> findByProviderAndProviderId(String provider, String providerId);
}
