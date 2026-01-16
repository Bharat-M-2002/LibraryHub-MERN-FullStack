import api from "./api";

const TOKEN_KEY = "libraryhub_token";

// =====================
// LOGIN (LOCAL)
// =====================
export const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  const { token } = response.data;

  // store ONLY token
  localStorage.setItem(TOKEN_KEY, token);

  return token;
};

// =====================
// SIGNUP (LOCAL)
// =====================
export const signup = async (email, password) => {
  const response = await api.post("/auth/signup", {
    email,
    password,
  });

  const { token } = response.data;

  // store ONLY token
  localStorage.setItem(TOKEN_KEY, token);

  return token;
};

/* =====================
   GOOGLE LOGIN
===================== */
export const googleLogin = async (idToken) => {
  const response = await api.post("/auth/google", {
    idToken,
  });

  const { token } = response.data;
  localStorage.setItem(TOKEN_KEY, token);

  return token;
};

/* =====================
   FETCH CURRENT USER
===================== */
export const fetchMe = async () => {
  const response = await api.get("/me");
  return response.data;
};

// =====================
// TOKEN HELPERS
// =====================
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// =====================
// LOGOUT
// =====================
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
