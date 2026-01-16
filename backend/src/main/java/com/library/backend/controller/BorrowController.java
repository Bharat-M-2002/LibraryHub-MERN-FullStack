package com.library.backend.controller;

import com.library.backend.dto.BorrowHistoryResponse;
import com.library.backend.service.BorrowService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrow")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BorrowController {

    private final BorrowService borrowService;

    // ------------------------------------------------
    // BORROW BOOK (uses logged-in user from JWT)
    // ------------------------------------------------
    @PostMapping("/{bookId}")
    public void borrowBook(
            @PathVariable String bookId,
            Authentication authentication
    ) {
        // 🔐 user email comes from JWT
        String userEmail = authentication.getName();
        borrowService.borrowBook(userEmail, bookId);
    }

    // ------------------------------------------------
    // RETURN BOOK
    // ------------------------------------------------
    @PutMapping("/return/{bookId}")
    public void returnBook(
            @PathVariable String bookId,
            Authentication authentication
    ) {
        String userEmail = authentication.getName();
        borrowService.returnBook(userEmail, bookId);
    }

    // ------------------------------------------------
    // CHECK AVAILABILITY
    // ------------------------------------------------
    @GetMapping("/available/{bookId}")
    public boolean isBookAvailable(@PathVariable String bookId) {
        return borrowService.isBookAvailable(bookId);
    }

    // ------------------------------------------------
    // BORROW HISTORY (My Profile page)
    // ------------------------------------------------
    @GetMapping("/history")
    public List<BorrowHistoryResponse> getBorrowHistory(
            Authentication authentication
    ) {
        String userEmail = authentication.getName();
        return borrowService.getBorrowHistory(userEmail);
    }
}
