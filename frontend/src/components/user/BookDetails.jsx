import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/common/Loader";

function BookDetails() {
  const { id } = useParams(); // 👈 MUST be 'id'
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:8080/api/books/${id}` // 👈 CORRECT API
        );

        setBook(res.data);
      } catch (err) {
        console.error(err);
        setError("Book not found");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <Loader />;

  if (error || !book) {
    return (
      <div className="text-center py-20 text-gray-600">
        Book not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <img
          src={book.imageUrlL}
          alt={book.title}
          className="w-full max-w-sm mx-auto object-contain rounded-xl shadow"
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="mt-2 text-lg text-gray-700">{book.author}</p>

          <div className="mt-6 space-y-2 text-gray-600">
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Year:</strong> {book.yearOfPublication}</p>
           
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
