import { useEffect, useState, useCallback } from "react";
import Snowfall from "react-snowfall";
import { fetchBooks } from "../../services/bookService";
import BookCard from "../../components/user/BookCard";
import Loader from "../../components/common/Loader";

const PAGE_SIZE = 12;

function BrowseBooks() {
  // ======================
  // STATE
  // ======================
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  // ======================
  // FETCH BOOKS
  // ======================
  const fetchBooksData = useCallback(async () => {
    try {
      setLoading(true);

      const data = await fetchBooks({
        query: searchQuery,
        page: currentPage,
        size: PAGE_SIZE,
      });

      setBooks(data?.books || []);
      setTotalPages(data?.totalPages || 0);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, currentPage]);

  // ======================
  // EFFECT
  // ======================
  useEffect(() => {
    fetchBooksData();
  }, [fetchBooksData]);

  // ======================
  // SEARCH
  // ======================
  const handleSearch = () => {
    setCurrentPage(0);
    fetchBooksData();
  };

  // ======================
  // RENDER
  // ======================
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-100 via-violet-100 to-purple-200 text-slate-900">
      {/* 🎄 SNOWFALL (unchanged) */}
      <Snowfall
        snowflakeCount={35}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* PAGE CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-20">
        {/* Header with aesthetic styling */}
        <div className="mb-8">
          <div className="inline-block text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Browse Books
            </h1>
            <div className="mt-1 h-1 w-24 rounded-full bg-gradient-to-r from-violet-400 via-indigo-400 to-pink-400"></div>
          </div>
          <p className="mt-3 text-sm md:text-base text-slate-600 max-w-xl">
            Discover, search, and explore thousands of books from our collection.
          </p>
        </div>

        {/* Main glass card (matches other pages) */}
        <div className="bg-purple-50/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl border border-violet-100">
          {/* Compact search bar, left aligned, single wrapper */}
          <div className="mb-6 flex items-center gap-3">
            <div className="relative w-full sm:w-80 md:w-96">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 17a6 6 0 100-12 6 6 0 000 12z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl border border-violet-100 text-sm bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:bg-white transition"
              />
            </div>
            <button
              onClick={handleSearch}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold shadow-md hover:from-violet-700 hover:to-indigo-700 hover:shadow-lg transition-all"
            >
              Search
            </button>
          </div>

          {/* Small search button below on mobile */}
          <div className="sm:hidden mb-6">
            <button
              onClick={handleSearch}
              className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold shadow-md hover:from-violet-700 hover:to-indigo-700 hover:shadow-lg transition-all"
            >
              Search
            </button>
          </div>

          {/* LOADER */}
          {loading && (
            <div className="py-12">
              <Loader />
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && books.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold mb-2 text-slate-800">
                No Books Found
              </h2>
              <p className="text-slate-500">
                Try adjusting your search criteria or clearing the filter.
              </p>
            </div>
          )}

          {/* BOOK GRID */}
          {!loading && books.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {books.map((book) => (
              <BookCard
                  bookId={book.id}          // ✅ THIS IS THE FIX
                  title={book.title}
                  author={book.author}
                  year={book.yearOfPublication}
                  publisher={book.publisher}
                  image={book.imageUrlL}
              />

            ))}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-6 mt-12">
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 border border-violet-100 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-violet-50 hover:text-violet-700 hover:border-violet-400 transition"
              >
                Prev
              </button>

              <span className="font-medium text-slate-700">
                Page{" "}
                <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700">
                  {currentPage + 1}
                </span>{" "}
                of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages - 1}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 border border-violet-100 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-violet-50 hover:text-violet-700 hover:border-violet-400 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowseBooks;
