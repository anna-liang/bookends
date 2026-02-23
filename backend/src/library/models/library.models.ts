export const ShelfPrivacy = {
  private: "private",
  public: "public",
} as const;

export type ShelfPrivacy = typeof ShelfPrivacy[keyof typeof ShelfPrivacy];

export const BookStatus = {
  READ: "read",
  READING: "reading",
  TO_READ: "to_read"
} as const;

export type BookStatus = typeof BookStatus[keyof typeof BookStatus];

export interface ShelfBook {
  bookId: string,
  title: string,
  authors: string[],
  thumbnail: string,
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

export interface UserBook {
  id: string,
  status: BookStatus,
  userRating?: number | undefined,
  userId: string,
  bookId: string,
  readAt?: string | undefined
}