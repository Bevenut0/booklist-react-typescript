import axios from "axios";
import type { Book, NewBook } from "../types/book";

const apiUrl = import.meta.env.VITE_CRUDCRUD_URL as string | undefined;

if (!apiUrl) {
  console.warn(
    "VITE_CRUDCRUD_URL não definida. Crie o arquivo .env conforme o README.",
  );
}

const api = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
});

export async function getBooks(): Promise<Book[]> {
  const response = await api.get<Book[]>("");
  return response.data;
}

export async function createBook(book: NewBook): Promise<Book> {
  const response = await api.post<Book>("", book);
  return { ...book, _id: response.data._id };
}

export async function deleteBook(id: string): Promise<void> {
  await api.delete(`/${id}`);
}

export async function updateBook(book: Book): Promise<void> {
  const { _id, ...bookData } = book;
  await api.put(`/${_id}`, bookData);
}