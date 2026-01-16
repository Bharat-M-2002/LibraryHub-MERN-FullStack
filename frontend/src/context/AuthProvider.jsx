import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

import {
  login as loginService,
  signup as signupService,
  logout as logoutService,
  getToken,
  fetchMe,
} from "../services/authService";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // =====================
  // INIT AUTH (BOOTSTRAP)
  // =====================
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const user = await fetchMe(); // 🔥 backend source of truth
        setUser(user);
        setIsAdmin(user.role === "ADMIN" || user.role === "ROLE_ADMIN");
        setIsAuthenticated(true);
      } catch (error) {
        logoutService(); // invalid / expired token
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // =====================
  // LOGIN
  // =====================
  const login = async (email, password) => {
    await loginService(email, password); // stores token
    const user = await fetchMe();         // fetch fresh user
    setUser(user);
    setIsAdmin(user.role === "ADMIN" || user.role === "ROLE_ADMIN");
    setIsAuthenticated(true);
  };

  // =====================
  // SIGNUP
  // =====================
  const register = async (email, password) => {
    await signupService(email, password); // stores token
    const user = await fetchMe();
    setUser(user);
    setIsAdmin(false);
    setIsAuthenticated(true);
  };

  // =====================
  // LOGOUT
  // =====================
  const logout = () => {
    logoutService();
    setUser(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
