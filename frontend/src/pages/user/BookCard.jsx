import { Link } from "react-router-dom";

function BookCard({ id, title, author, image }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <img src={image} alt={title} className="h-48 mx-auto" />

      <h3 className="font-semibold mt-3">{title}</h3>
      <p className="text-sm text-gray-600">{author}</p>

      <div className="flex justify-between mt-4">
        <span className="text-green-600 text-sm">Available to borrow</span>

        <Link
          to={`/books/${id}`}
          className="text-purple-600 font-medium"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
