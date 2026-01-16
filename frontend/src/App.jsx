import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./hooks/useAuth";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Loader from "./components/common/Loader";

// User Pages
import UserHome from "./pages/user/UserHome";
import BrowseBooks from "./pages/user/BrowseBooks";
import UserProfile from "./pages/user/UserProfile";
import BookDetails from "./pages/user/BookDetails";

// Admin Pages
import AdminHome from "./pages/admin/AdminHome";
import ManageBooks from "./pages/admin/ManageBooks";
import ManageUsers from "./pages/admin/ManageUsers";

// Auth Pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import AuthPage from "./pages/auth/AuthPage";

/* =======================
   Protected Route
======================= */
function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <Loader fullScreen />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

/* =======================
   Public Route
======================= */
function PublicRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <Loader fullScreen />;

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin" : "/"} replace />;
  }

  return children;
}

/* =======================
   App Layout
======================= */
function AppLayout({ children }) {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isAdmin={isAdmin}
        isLoggedIn={isAuthenticated}
        onLogout={logout}
      />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}

/* =======================
   Routes
======================= */
function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* USER */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <UserHome />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/browse"
        element={
          <ProtectedRoute>
            <AppLayout>
              <BrowseBooks />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <UserProfile />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/books/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <BookDetails />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AppLayout>
              <AdminHome />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/books"
        element={
          <ProtectedRoute adminOnly>
            <AppLayout>
              <ManageBooks />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute adminOnly>
            <AppLayout>
              <ManageUsers />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />


      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/* =======================
   Root App
======================= */
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
