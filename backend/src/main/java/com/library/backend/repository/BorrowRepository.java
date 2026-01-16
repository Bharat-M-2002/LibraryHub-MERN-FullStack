package com.library.backend.repository;

import com.library.backend.model.Borrow;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface BorrowRepository extends MongoRepository<Borrow, String> {

    List<Borrow> findByUserIdOrderByBorrowedAtDesc(String userId);

    Optional<Borrow> findByUserIdAndBookIdAndReturnedAtIsNull(String userId, String bookId);

    boolean existsByBookIdAndReturnedAtIsNull(String bookId);
}
