package com.library.backend.config;

import com.mongodb.client.MongoClient;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class MongoConnectionVerifier {

    private final MongoClient mongoClient;

    public MongoConnectionVerifier(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    @PostConstruct
    public void verifyConnection() {

        System.out.println("\n================ MONGODB DEBUG ================\n");

        System.out.println("Databases visible to Spring Boot:");
        mongoClient.listDatabaseNames()
                .forEach(db -> System.out.println(" - " + db));

        System.out.println("\nCollections inside BooksDB:");
        mongoClient.getDatabase("BooksDB")
                .listCollectionNames()
                .forEach(col -> System.out.println(" - " + col));

        System.out.println("\n==============================================\n");
    }
}
