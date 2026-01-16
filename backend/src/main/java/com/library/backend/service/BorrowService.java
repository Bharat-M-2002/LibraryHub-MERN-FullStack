package com.library.backend.service;

import com.library.backend.dto.BorrowHistoryResponse;
import com.library.backend.model.Book;
import com.library.backend.model.Borrow;
import com.library.backend.model.User;
import com.library.backend.repository.BookRepository;
import com.library.backend.repository.BorrowRepository;
import com.library.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BorrowService {

    private final BorrowRepository borrowRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public BorrowService(
            BorrowRepository borrowRepository,
            BookRepository bookRepository,
            UserRepository userRepository
    ) {
        this.borrowRepository = borrowRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    // ======================================================
    // 🔐 BORROW BOOK USING EMAIL (JWT FLOW)
    // ======================================================
    public void borrowBookByEmail(String email, String bookId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        borrowBook(user.getId(), bookId);
    }

    // ======================================================
    // 📚 CORE BORROW LOGIC (ID-BASED)
    // ======================================================
    public void borrowBook(String userId, String bookId) {

        boolean alreadyBorrowed =
                borrowRepository.existsByBookIdAndReturnedAtIsNull(bookId);

        if (alreadyBorrowed) {
            throw new RuntimeException("Book already borrowed");
        }

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Borrow borrow = new Borrow();
        borrow.setUserId(userId);
        borrow.setBookId(bookId);

        // 📸 Snapshot (important)
        borrow.setTitle(book.getTitle());
        borrow.setAuthor(book.getAuthor());
        borrow.setImageUrl(book.getImageUrlL());

        borrow.setBorrowedAt(LocalDate.now());
        borrow.setDueDate(LocalDate.now().plusDays(7));
        borrow.setStatus("BORROWED");

        borrowRepository.save(borrow);
    }

    // ======================================================
    // 🔁 RETURN BOOK
    // ======================================================
    public void returnBook(String userId, String bookId) {

        Borrow borrow = borrowRepository
                .findByUserIdAndBookIdAndReturnedAtIsNull(userId, bookId)
                .orElseThrow(() -> new RuntimeException("Active borrow not found"));

        borrow.setReturnedAt(LocalDate.now());
        borrow.setStatus("RETURNED");

        borrowRepository.save(borrow);
    }

    // ======================================================
    // ✅ AVAILABILITY
    // ======================================================
    public boolean isBookAvailable(String bookId) {
        return !borrowRepository.existsByBookIdAndReturnedAtIsNull(bookId);
    }

    // ======================================================
    // 🧾 BORROW HISTORY
    // ======================================================
    public List<BorrowHistoryResponse> getBorrowHistory(String userId) {

        return borrowRepository.findByUserIdOrderByBorrowedAtDesc(userId)
                .stream()
                .map(borrow -> {
                    BorrowHistoryResponse res = new BorrowHistoryResponse();

                    res.setBorrowId(borrow.getId());
                    res.setBookId(borrow.getBookId());

                    res.setTitle(borrow.getTitle());
                    res.setAuthor(borrow.getAuthor());
                    res.setImageUrl(borrow.getImageUrl());

                    res.setBorrowedAt(borrow.getBorrowedAt());
                    res.setDueAt(borrow.getDueDate());
                    res.setReturnedAt(borrow.getReturnedAt());
                    res.setStatus(borrow.getStatus());

                    return res;
                })
                .collect(Collectors.toList());
    }
}
