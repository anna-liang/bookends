import type { Shelf, ShelfBook } from "../../library/models/library.models.ts"
import type { ShelfRow } from "../../library/models/library.db.types.ts"

export function mapDbShelfBookToShelfBook(shelfBookRow: any): ShelfBook {
    const shelfBook = {
        bookId: shelfBookRow.id,
        title: shelfBookRow.title,
        authors: shelfBookRow.authors,
        thumbnail: shelfBookRow.thumbnail,
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