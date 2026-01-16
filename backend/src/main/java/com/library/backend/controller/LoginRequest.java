package com.library.backend.controller;

public record LoginRequest(
        String email,
        String password
) {
}
