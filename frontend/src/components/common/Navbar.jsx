import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          to={isAuthenticated ? (isAdmin ? "/admin" : "/") : "/login"}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white text-xl font-black">📚</span>
          </div>
          <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            LibraryHub
          </span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {!isAuthenticated && (
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md hover:shadow-xl hover:scale-105 transition-all"
            >
              Login
            </button>
          )}

          {isAuthenticated && (
            <>
              {/* USER EMAIL */}
              <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/60 border border-gray-200 shadow-sm">
                <span className="text-sm font-semibold text-gray-700">
                  {user?.email}
                </span>
              </div>

              {/* ADMIN BADGE */}
              {isAdmin && (
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md">
                  ADMIN
                </span>
              )}

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
