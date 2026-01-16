import api from "./api";

export const fetchBooks = async ({ query = "", page = 0, size = 12 }) => {
  const response = await api.get("/books/search", {
    params: {
      query,
      page,
      size,
    },
  });

  return response.data;
};
