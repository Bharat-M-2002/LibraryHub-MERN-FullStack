package com.library.backend.service;

import com.library.backend.model.Book;
import com.library.backend.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final Random random = new Random();

    public Page<Book> searchBooks(
            String query,
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        boolean isSearch = query != null && !query.trim().isEmpty();
        boolean hasSort = sortBy != null && !sortBy.isBlank();

        // ------------------------------------------------
        // CASE 1: DEFAULT BROWSE → RANDOM BOOKS
        // ------------------------------------------------
        if (!isSearch && !hasSort) {

            long totalBooks = bookRepository.count();

            int maxPage = (int) (totalBooks / size);
            int randomPage = maxPage > 0 ? random.nextInt(maxPage) : 0;

            Pageable pageable = PageRequest.of(randomPage, size);

            Page<Book> randomPageResult =
                    bookRepository.findAll(pageable);

            return new PageImpl<>(
                    randomPageResult.getContent(),
                    PageRequest.of(page, size),
                    totalBooks
            );
        }

        // ------------------------------------------------
        // CASE 2: SEARCH OR USER SORT
        // ------------------------------------------------
        // ------------------------------------------------
// CASE 2: SEARCH OR USER SORT
// ------------------------------------------------
        if (!hasSort) {
            sortBy = "title"; // default when searching
        }

        Sort.Direction sortDirection =
                "desc".equalsIgnoreCase(direction)
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC;

        String mappedSortField = switch (sortBy) {
            case "title" -> "Book-Title";
            case "author" -> "Book-Author";
            case "year" -> "Year-Of-Publication";
            default -> "Book-Title";
        };

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortDirection, mappedSortField)
        );

// 🔴 FIX STARTS HERE
        if (!isSearch) {
            // User wants sorting WITHOUT search
            return bookRepository.findAll(pageable);
        }

// Search + sort
        return bookRepository.searchBooks(query, pageable);
    }

    public Book getBookById(String id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

}
