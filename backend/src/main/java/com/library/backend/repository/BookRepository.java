package com.library.backend.repository;

import com.library.backend.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface BookRepository extends MongoRepository<Book, String> {

    /**
     * Search books by:
     * 1. Title
     * 2. Author
     * 3. ISBN
     *
     * - Case-insensitive
     * - Supports pagination & sorting via Pageable
     */
    @Query("""
        {
          $or: [
            { 'Book-Title': { $regex: ?0, $options: 'i' } },
            { 'Book-Author': { $regex: ?0, $options: 'i' } },
            { 'ISBN': { $regex: ?0, $options: 'i' } }
          ]
        }
    """)
    Page<Book> searchBooks(String query, Pageable pageable);

    /**
     * Fetch a single book by ID
     * Used for Book Details page
     */
    Optional<Book> findById(String id);
}
