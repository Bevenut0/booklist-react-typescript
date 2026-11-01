import { useState, type FormEvent, type ChangeEvent } from "react";
import type { BookFormProps, BookStatus, NewBook } from "../types/book";

interface BookFormState {
  title: string;
  author: string;
  status: BookStatus;
}

export default function BookForm({
  onAddBook,
  isSubmitting,
}: BookFormProps) {
  const [form, setForm] = useState<BookFormState>({
    title: "",
    author: "",
    status: "Não lido",
  });
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const title = form.title.trim();
    const author = form.author.trim();

    if (!title || !author) {
      setError("Preencha o título e o autor.");
      return;
    }

    const newBook: NewBook = { title, author, status: form.status };

    try {
      setError(null);
      await onAddBook(newBook);
      setForm({ title: "", author: "", status: "Não lido" });
    } catch {
      setError("Não foi possível cadastrar o livro. Tente novamente.");
    }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <span className="eyebrow">NOVO REGISTRO</span>
          <h2>Adicionar livro</h2>
        </div>
        <span className="form-icon" aria-hidden="true">＋</span>
      </div>

      <label htmlFor="title">Título</label>
      <input
        id="title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Ex.: O Hobbit"
        maxLength={120}
        required
      />

      <label htmlFor="author">Autor</label>
      <input
        id="author"
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Ex.: J. R. R. Tolkien"
        maxLength={100}
        required
      />

      <label htmlFor="status">Status de leitura</label>
      <select id="status" name="status" value={form.status} onChange={handleChange}>
        <option value="Não lido">Não lido</option>
        <option value="Lido">Lido</option>
      </select>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Adicionar à biblioteca"}
      </button>
    </form>
  );
}