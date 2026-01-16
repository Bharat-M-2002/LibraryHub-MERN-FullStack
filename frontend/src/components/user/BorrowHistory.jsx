import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader";
import { useAuth } from "../../hooks/useAuth";

function BorrowHistory() {
  const { user } = useAuth(); // 👈 logged-in user
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/borrow/history/${user.email}`
        );
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to load borrow history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  if (loading) return <Loader />;

  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No borrow history found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {history.map((item) => (
        <div
          key={item.borrowId}
          className="flex gap-6 p-5 bg-white rounded-xl shadow-sm"
        >
          <img
            src={item.imageUrl || "/placeholder-book.png"}
            alt={item.title}
            className="w-24 h-32 object-cover rounded"
          />

          <div className="flex-1">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.author}</p>

            <div className="text-sm text-gray-500 mt-2 space-y-1">
              <p>Borrowed: {item.borrowedAt}</p>
              <p>Due: {item.dueAt}</p>
              {item.returnedAt && <p>Returned: {item.returnedAt}</p>}
            </div>
          </div>

          <span
            className={`h-fit px-4 py-1 rounded-full text-sm font-medium ${
              item.status === "BORROWED"
                ? "bg-blue-100 text-blue-700"
                : item.status === "OVERDUE"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default BorrowHistory;
