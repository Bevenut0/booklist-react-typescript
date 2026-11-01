import type { BookListProps } from "../types/book";
import BookItem from "./BookItem";

export default function BookList({
  books,
  onDelete,
  onToggleStatus,
  deletingId,
  updatingId,
}: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">▤</span>
        <h3>Sua biblioteca está vazia</h3>
        <p>Adicione seu primeiro livro usando o formulário ao lado.</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem
          key={book._id}
          book={book}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          isDeleting={deletingId === book._id}
          isUpdating={updatingId === book._id}
        />
      ))}
    </div>
  );
}