import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { borrowBook, isBookAvailable } from "../../services/borrowService";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";

function BookDetails() {
  const { id } = useParams(); // bookId from URL
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);

  // ----------------------------------
  // LOAD BOOK + AVAILABILITY
  // ----------------------------------
  useEffect(() => {
    if (!id) return;

    const loadBookDetails = async () => {
      try {
        setLoading(true);

        // 1️⃣ Fetch book details (JWT included via api)
        const bookRes = await api.get(`/books/${id}`);
        setBook(bookRes.data);

        // 2️⃣ Check availability
        const isAvailable = await isBookAvailable(id);
        setAvailable(isAvailable);
      } catch (error) {
        console.error("Failed to load book details", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    loadBookDetails();
  }, [id]);

  

  // ----------------------------------
  // BORROW BOOK
  // ----------------------------------
  const handleBorrow = async () => {
  try {
    setBorrowing(true);
    await borrowBook(book.id);
    setAvailable(false);
  } catch (error) {
    console.error("Borrow failed", error);
  } finally {
    setBorrowing(false);
  }
};


  // ----------------------------------
  // UI STATES
  // ----------------------------------
  if (loading) return <Loader />;

  if (!book) {
    return (
      <div className="text-center py-20 text-gray-500">
        Book not found
      </div>
    );
  }

  // ----------------------------------
  // UI
  // ----------------------------------
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* IMAGE */}
      <div className="flex justify-center">
        <img
          src={book.imageUrlL}
          alt={book.title}
          className="w-full max-h-[500px] object-contain rounded-xl"
          onError={(e) => {
            e.target.src = "/placeholder-book.png";
          }}
        />
      </div>

      {/* DETAILS */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{book.author}</p>

        <div className="text-sm text-gray-500 mb-6 space-y-1">
          <p>
            <span className="font-medium">ISBN:</span> {book.isbn}
          </p>
          <p>
            <span className="font-medium">Publisher:</span>{" "}
            {book.publisher || "N/A"}
          </p>
          <p>
            <span className="font-medium">Year:</span>{" "}
            {book.yearOfPublication || "N/A"}
          </p>
        </div>

        {/* BORROW BUTTON */}
        <button
          onClick={handleBorrow}
          disabled={!available || borrowing}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            available
              ? "bg-violet-600 text-white hover:bg-violet-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {borrowing
            ? "Borrowing..."
            : available
            ? "Borrow Book"
            : "Currently Borrowed"}
        </button>
      </div>
    </div>
  );
}

export default BookDetails;
