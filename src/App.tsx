import { useCallback, useEffect, useMemo, useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import { createBook, deleteBook, getBooks, updateBook } from "./services/bookService";
import type { Book, BookStatus, NewBook } from "./types/book";

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"Todos" | BookStatus>("Todos");

  const loadBooks = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const data = await getBooks();
      setBooks(data);
    } catch {
      setError("Não foi possível carregar os livros. Verifique a URL da API no arquivo .env.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBooks();
  }, [loadBooks]);

  async function handleAddBook(book: NewBook): Promise<void> {
    try {
      setIsSubmitting(true);
      const createdBook = await createBook(book);
      setBooks((current) => [...current, createdBook]);
    } catch (requestError) {
      throw requestError;
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteBook(id: string): Promise<void> {
    try {
      setDeletingId(id);
      await deleteBook(id);
      setBooks((current) => current.filter((book) => book._id !== id));
    } catch {
      setError("Não foi possível remover o livro. Tente novamente.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleToggleStatus(book: Book): Promise<void> {
    const nextStatus: BookStatus =
      book.status === "Lido" ? "Não lido" : "Lido";
    const updatedBook: Book = { ...book, status: nextStatus };

    try {
      setUpdatingId(book._id);
      await updateBook(updatedBook);
      setBooks((current) =>
        current.map((item) => item._id === book._id ? updatedBook : item),
      );
    } catch {
      setError("Não foi possível atualizar o status do livro.");
    } finally {
      setUpdatingId(null);
    }
  }

  const visibleBooks = useMemo(
    () => filter === "Todos" ? books : books.filter((book) => book.status === filter),
    [books, filter],
  );

  const readCount = books.filter((book) => book.status === "Lido").length;

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Booklist início">
          <span className="brand-mark">B</span>
          <span>booklist<span className="brand-period">.</span></span>
        </a>
        <span className="topbar-label">SUA BIBLIOTECA PESSOAL</span>
      </header>

      <section className="hero">
        <div>
          <span className="eyebrow">ORGANIZE SUAS LEITURAS</span>
          <h1>Uma biblioteca<br /><span>do seu jeito.</span></h1>
          <p>Guarde seus livros, acompanhe seu progresso e mantenha tudo em um só lugar.</p>
        </div>
        <div className="hero-stat">
          <span className="stat-number">{books.length.toString().padStart(2, "0")}</span>
          <span className="stat-label">LIVROS NA BIBLIOTECA</span>
          <span className="stat-divider" />
          <span className="stat-read">{readCount} lidos</span>
        </div>
      </section>

      <section className="content-grid">
        <aside className="sidebar">
          <BookForm onAddBook={handleAddBook} isSubmitting={isSubmitting} />
          <div className="tip-card">
            <span className="tip-label">DICA</span>
            <p>Pequenos passos todos os dias constroem grandes histórias.</p>
          </div>
        </aside>

        <section className="library-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">ACERVO</span>
              <h2>Seus livros</h2>
            </div>
            <span className="book-count">{visibleBooks.length} {visibleBooks.length === 1 ? "livro" : "livros"}</span>
          </div>

          <div className="filters" aria-label="Filtrar livros">
            {(["Todos", "Lido", "Não lido"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={`filter-button ${filter === option ? "active" : ""}`}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {error && (
            <div className="alert" role="alert">
              <span>{error}</span>
              <button type="button" onClick={() => void loadBooks()}>Tentar novamente</button>
            </div>
          )}

          {isLoading ? (
            <div className="loading-state">Carregando sua biblioteca...</div>
          ) : (
            <BookList
              books={visibleBooks}
              onDelete={handleDeleteBook}
              onToggleStatus={handleToggleStatus}
              deletingId={deletingId}
              updatingId={updatingId}
            />
          )}
        </section>
      </section>

      <footer className="footer">
        <span>BOOKLIST © {new Date().getFullYear()}</span>
        <span>FEITO PARA QUEM AMA LER</span>
      </footer>
    </main>
  );
}