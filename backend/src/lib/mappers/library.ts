import type { Shelf, ShelfBook, UserBook } from "../../library/models/library.models.ts"
import type { ShelfRow, UserBookRow } from "../../library/models/library.db.types.ts"

export function mapDbShelfBookToShelfBook(shelfBookRow: any): ShelfBook {
    const shelfBook = {
        bookId: shelfBookRow.book_id,
        title: shelfBookRow.title,
        authors: shelfBookRow.authors,
        thumbnail: shelfBookRow.thumbnail,
        userBookId: shelfBookRow.user_book_id,
        status: shelfBookRow.status,
        userRating: shelfBookRow.user_rating,
        readAt: shelfBookRow.read_at,
        addedAt: shelfBookRow.added_at
    }
    return shelfBook
}

export function mapDbShelfToShelf(shelfRow: ShelfRow): Shelf {
    const shelf: Shelf = {
        id: shelfRow.id,
        name: shelfRow.name,
        description: shelfRow.description ?? undefined,
        privacy: shelfRow.privacy,
        books: [],
        createdAt: shelfRow.created_at
    }
    return shelf
}

export function mapDbUserBookToUserBook(userBookRow: UserBookRow): UserBook {
    const userBook: UserBook = {
        id: userBookRow.id,
        status: userBookRow.status,
        userRating: userBookRow.user_rating ?? undefined,
        userId: userBookRow.user_id,
        bookId: userBookRow.book_id,
        readAt: userBookRow.read_at ?? undefined
    }
    return userBook
}