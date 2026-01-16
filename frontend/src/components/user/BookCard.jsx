import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";


const BookCard = ({
  bookId,        // 👈 REQUIRED
  title,
  author,
  year,
  publisher,
  image,
}) => {
  const navigate = useNavigate();


  const handleViewDetails = () => {
    navigate(`/books/${bookId}`);
  };


  return (
    <div
      className="group relative cursor-pointer rounded-2xl border border-violet-200/70 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-sky-50/80 px-4 py-4 md:px-6 md:py-5 shadow-[0_10px_30px_rgba(129,140,248,0.28)] hover:shadow-[0_18px_45px_rgba(129,140,248,0.38)] transition-transform hover:-translate-y-0.5"
      onClick={handleViewDetails} // 👈 whole card clickable
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleViewDetails()}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* IMAGE */}
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          {image ? (
            <div className="relative rounded-xl bg-white/80 border border-violet-100 shadow-md p-2">
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="h-32 w-24 md:h-40 md:w-28 object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          ) : (
            <div className="flex h-32 w-24 md:h-40 md:w-28 items-center justify-center rounded-xl border border-violet-100 bg-white/80 shadow-inner">
              <BookOpen className="h-8 w-8 text-violet-400" />
            </div>
          )}
        </div>


        {/* TEXT */}
        <div className="flex flex-1 flex-col justify-between gap-3">
          <div>
            <h3 className="text-base md:text-lg font-semibold leading-snug text-slate-900 line-clamp-2">
              {title}
            </h3>


            <p className="mt-1 text-sm font-medium text-slate-700">
              {author || "Unknown author"}
            </p>


            {(year || publisher) && (
              <p className="mt-1 text-xs text-slate-600">
                {year && <span>{year}</span>}
                {year && publisher && <span className="mx-1">•</span>}
                {publisher && <span>{publisher}</span>}
              </p>
            )}
          </div>


          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-violet-600 shadow-sm border border-violet-100">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 group-hover:bg-emerald-300" />
              Available to borrow
            </span>


            <button
              onClick={(e) => {
                e.stopPropagation(); // 👈 prevent double navigation
                handleViewDetails();
              }}
              className="ml-auto text-xs md:text-sm font-semibold text-violet-700 hover:text-violet-800 hover:underline"
            >
              View details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default BookCard;