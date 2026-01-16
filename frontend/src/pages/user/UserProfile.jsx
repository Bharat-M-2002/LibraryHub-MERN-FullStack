import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { fetchBorrowHistory, returnBook } from "../../services/borrowService";
import { useAuth } from "../../hooks/useAuth";

function UserProfile() {
  const { user } = useAuth(); // user.email
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  // ----------------------------
  // LOAD BORROW HISTORY
  // ----------------------------
  const loadBorrowHistory = async () => {
    try {
      setLoading(true);
      const data = await fetchBorrowHistory(user.email);
      setBorrows(data);
    } catch (error) {
      console.error("Failed to load borrow history", error);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  if (user?.email) {
    loadBorrowHistory();
  }
}, [user]);


  // ----------------------------
  // RETURN BOOK
  // ----------------------------
  const handleReturn = async (bookId) => {
    try {
      setActionLoading(bookId);
      await returnBook(user.email, bookId);
      await loadBorrowHistory();
    } catch (error) {
      console.error("Failed to return book", error);
    } finally {
      setActionLoading(null);
    }
  };

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">My Borrowed Books</h1>

      {loading && <Loader />}

      {!loading && borrows.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          You have not borrowed any books yet.
        </div>
      )}

      <div className="space-y-6">
        {borrows.map((borrow) => (
          <div
            key={borrow.borrowId}
            className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl bg-white shadow"
          >
            {/* IMAGE */}
            <img
              src={borrow.imageUrl || "/placeholder-book.png"}
              alt={borrow.title}
              className="w-32 h-48 object-contain rounded"
            />

            {/* DETAILS */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{borrow.title}</h2>
              <p className="text-gray-600">{borrow.author}</p>

              <div className="mt-3 text-sm text-gray-500">
                <p>Borrowed on: {borrow.borrowedAt}</p>
                <p>Due on: {borrow.dueAt}</p>
              </div>

              <div className="mt-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    borrow.status === "BORROWED"
                      ? "bg-blue-100 text-blue-700"
                      : borrow.status === "OVERDUE"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {borrow.status}
                </span>
              </div>
            </div>

            {/* ACTION */}
            {(borrow.status === "BORROWED" ||
              borrow.status === "OVERDUE") && (
              <div className="flex items-center">
                <button
                  onClick={() => handleReturn(borrow.bookId)}
                  disabled={actionLoading === borrow.bookId}
                  className="px-4 py-2 rounded bg-violet-600 text-white hover:bg-violet-700 disabled:bg-gray-300"
                >
                  {actionLoading === borrow.bookId
                    ? "Returning..."
                    : "Return Book"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
