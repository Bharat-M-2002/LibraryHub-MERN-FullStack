package com.library.backend.controller;

import com.library.backend.model.Book;
import com.library.backend.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5175"
})

public class BookController {

    private final BookService bookService;

    // ------------------------------------------------
    // SEARCH / BROWSE / SORT (MUST BE FIRST)
    // ------------------------------------------------
    @GetMapping("/search")
    public Map<String, Object> searchBooks(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String direction
    ) {
        Page<Book> result = bookService.searchBooks(
                query,
                page,
                size,
                sortBy,
                direction
        );

        Map<String, Object> response = new HashMap<>();
        response.put("books", result.getContent());
        response.put("currentPage", result.getNumber());
        response.put("totalPages", result.getTotalPages());
        response.put("totalBooks", result.getTotalElements());

        return response;
    }

    // ------------------------------------------------
    // BOOK DETAILS (MUST BE AFTER /search)
    // ------------------------------------------------
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable String id) {
        return bookService.getBookById(id);
    }


}
