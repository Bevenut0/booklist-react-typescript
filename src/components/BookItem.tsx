import type { BookItemProps } from "../types/book";

export default function BookItem({
  book,
  onDelete,
  onToggleStatus,
  isDeleting,
  isUpdating,
}: BookItemProps) {
  return (
    <article className="book-card">
      <div className="book-cover" aria-hidden="true">
        <span>{book.title.trim().charAt(0).toUpperCase()}</span>
      </div>

      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <span className={`status ${book.status === "Lido" ? "read" : "unread"}`}>
          <span className="status-dot" />
          {book.status}
        </span>
      </div>

      <div className="book-actions">
        <button
          className="text-button"
          type="button"
          onClick={() => void onToggleStatus(book)}
          disabled={isUpdating || isDeleting}
          aria-label={`Alterar status de ${book.title}`}
        >
          {isUpdating ? "Atualizando..." : "Alterar status"}
        </button>
        <button
          className="delete-button"
          type="button"
          onClick={() => void onDelete(book._id)}
          disabled={isDeleting || isUpdating}
          aria-label={`Remover ${book.title}`}
          title="Remover livro"
        >
          {isDeleting ? "Removendo..." : "Remover"}
        </button>
      </div>
    </article>
  );
}