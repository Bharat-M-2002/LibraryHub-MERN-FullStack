package com.library.backend.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MongoUriPrinter {

    @Value("${spring.data.mongodb.uri:NOT_FOUND}")
    private String mongoUri;

    @PostConstruct
    public void printMongoUri() {
        System.out.println("\n===== MONGO URI USED BY SPRING =====");
        System.out.println(mongoUri);
        System.out.println("===================================\n");
    }
}
