export const ShelfPrivacy = {
  PRIVATE: "private",
  PUBLIC: "public",
} as const;

export type ShelfPrivacy = typeof ShelfPrivacy[keyof typeof ShelfPrivacy];

export const BookStatus = {
  READ: "read",
  READING: "reading",
  TO_READ: "to_read",
} as const;

export type BookStatus = typeof BookStatus[keyof typeof BookStatus];

export const BookStatusReadable = {
  [BookStatus.READ]: "Read",
  [BookStatus.READING]: "Reading",
  [BookStatus.TO_READ]: "Want to read",
} as const;

export interface ShelfBook {
  bookId: string,
  title: string,
  authors: string[],
  thumbnail: string,
  userBookId: string,
  status: BookStatus,
  userRating: number,
  readAt: string,
  addedAt: string
}

export interface Shelf {
  id: string,
  name: string,
  description?: string | undefined,
  privacy: ShelfPrivacy,
  books: ShelfBook[]
  createdAt: string
}
