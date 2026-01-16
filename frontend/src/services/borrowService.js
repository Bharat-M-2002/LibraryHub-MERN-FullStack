import api from "./api";

export const fetchBorrowHistory = async () => {
  const res = await api.get("/borrow/history");
  return res.data;
};


export const returnBook = async (bookId) => {
  await api.put(`/borrow/return/${bookId}`);
};

export const borrowBook = async (bookId) => {
  await api.post(`/borrow/${bookId}`);
};

export const isBookAvailable = async (bookId) => {
  const res = await api.get(`/borrow/available/${bookId}`);
  return res.data;
};
