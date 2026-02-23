import type { BookStatus } from "./library.models.ts"
import { ShelfPrivacy } from "./library.models.ts"

export interface ShelfRow {
    id: string,
    name: string,
    description?: string,
    owner: string,
    privacy: ShelfPrivacy,
    created_at: string,
}

export interface ShelfBookRow {
    id: string,
    shelf_id: string,
    book_id: string,
    added_at: string,
    position?: number
}

export interface UserBookRow {
    id: string,
    status: BookStatus,
    user_rating?: number,
    user_id: string,
    book_id: string,
    read_at?: string
}