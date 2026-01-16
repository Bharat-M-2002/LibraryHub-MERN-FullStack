package com.library.backend.dto;

import com.library.backend.model.Book;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class BookPageResponse {

    private List<Book> books;

    private int currentPage;
    private int totalPages;
    private long totalBooks;
}
