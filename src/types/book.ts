export type BookStatus = "Lido" | "Não lido";

export interface Book {
  _id: string;
  title: string;
  author: string;
  status: BookStatus;
}

export type NewBook = Omit<Book, "_id">;

export interface BookFormProps {
  onAddBook: (book: NewBook) => Promise<void>;
  isSubmitting: boolean;
}

export interface BookItemProps {
  book: Book;
  onDelete: (id: string) => Promise<void>;
  onToggleStatus: (book: Book) => Promise<void>;
  isDeleting: boolean;
  isUpdating: boolean;
}

export interface BookListProps {
  books: Book[];
  onDelete: (id: string) => Promise<void>;
  onToggleStatus: (book: Book) => Promise<void>;
  deletingId: string | null;
  updatingId: string | null;
}