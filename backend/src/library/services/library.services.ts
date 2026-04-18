import { pool } from '../../db.ts';
import { v4 as uuidv4 } from 'uuid'
import { BookStatus, ShelfPrivacy, type Shelf, type UserBook } from '../models/library.models.ts';
import dayjs, { type Dayjs } from 'dayjs';
import { HttpError } from '../../utils/HttpError.ts';
import type { UserBookRow, ShelfBookRow } from '../models/library.db.types.ts';
import { mapDbShelfToShelf, mapDbShelfBookToShelfBook, mapDbUserBookToUserBook } from '../../lib/mappers/library.ts';

/**
 * Creates a new shelf for a given user
 * @function createShelf
 * @param {Object} params - Shelf creation parameters
 * @param {string} params.name - The name of the shelf
 * @param {string} [params.description] - Optional description of shelf
 * @param {string} params.owner - The ID of the user who owns the shelf
 * @param {ShelfPrivacy} params.privacy - The privacy status of shelf
 * @returns {Promise<Shelf>} - The created shelf
 */
export const createShelf = async ({ name, description, owner, privacy }: { name: string, description?: string, owner: string, privacy: ShelfPrivacy }): Promise<Shelf> => {
  try {
    const result = await pool.query<Shelf>(`
        INSERT INTO "shelf" (id, name, description, owner, privacy, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (name, owner) DO NOTHING
        RETURNING *;
        `,
      [uuidv4(), name, description, owner, privacy, dayjs(new Date())]
    )
    if (result.rows.length === 0) {
      throw new HttpError("A shelf with this name already exists.", 409)
    }
    const createdShelf = result.rows[0]

    if (!createdShelf) {
      throw new HttpError("Database failed to create record.", 500)
    }
    return createdShelf
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Updates a shelf
 * @function updateShelf
 * @param {Object} params - Shelf update parameters
 * @param {string} params.name - The new name of the shelf
 * @param {string} [params.description] - Optional new description of shelf
 * @param {ShelfPrivacy} params.privacy - The new privacy status of shelf
 * @param {string} params.shelfId - The ID of the shelf to update
 */
export const updateShelf = async ({ name, description, privacy, shelfId }: { name: string, description?: string, privacy: ShelfPrivacy, shelfId: string }) => {
  try {
    const result = await pool.query<Shelf>(`
          UPDATE "shelf"
          SET
            name = COALESCE(NULLIF($1, ''), name),
            description = COALESCE($2, description),
            privacy = $3
          WHERE id = $4
          RETURNING *;
        `,
      [name, description, privacy, shelfId]
    )
    if (result.rows.length === 0) {
      throw new HttpError("Unexpected error updating shelf", 500)
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Gets all shelves for a given user
 * @function getShelves
 * @param {Object} params - Parameters for getting shelves
 * @param {string} params.owner - The ID of the user whose shelves to retrieve
 * @returns {Promise<Shelf[]>} - An array of shelves belonging to the specified user
 */
export const getShelves = async ({ owner }: { owner: string }): Promise<Shelf[]> => {
  try {
    const result = await pool.query<Shelf>(`
        SELECT * FROM "shelf"
        WHERE owner = $1
        `,
      [owner]
    )

    return result.rows
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Retrieves a specific shelf by its ID and owner
 * @function getShelf
 * @param {Object} params - Parameters for retrieving a shelf
 * @param {string} params.shelfId - The ID of the shelf to retrieve
 * @param {string} params.owner - The ID of the user who owns the shelf
 * @returns {Promise<Shelf>} - The requested shelf
 */
export const getShelf = async ({ shelfId, owner }: { shelfId: string, owner: string }): Promise<Shelf> => {
  let shelf;
  try {
    const shelfResult = await pool.query(`
        SELECT * FROM "shelf"
        WHERE id = $1 AND owner = $2
        `,
      [shelfId, owner]
    )
    if (shelfResult.rows !== undefined && shelfResult.rows.length === 0) {
      throw new HttpError("Shelf not found.", 404)
    }
    shelf = mapDbShelfToShelf(shelfResult.rows[0])
  } catch (err) {
    console.error(err);
    throw err;
  }
  try {
    // join shelf with all books in shelf
    const shelfBooksResult = await pool.query(`
        SELECT b.id as "book_id", b.title, b.authors, b.thumbnail, ub.id as "user_book_id", ub.status, ub.user_rating, ub.read_at, sb.added_at FROM shelf s 
        JOIN shelf_book sb ON s.id = sb.shelf_id
        JOIN user_book ub ON ub.id = sb.user_book_id
        JOIN book b ON ub.book_id = b.id
        WHERE s.id = $1 AND s.owner = $2
        `,
      [shelfId, owner]
    )
    if (shelfBooksResult.rows === undefined) {
      throw new HttpError("Books not found.", 404)
    }
    shelf.books = shelfBooksResult.rows.map((shelfBook) => mapDbShelfBookToShelfBook(shelfBook))
    return shelf
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteShelf = async () => {

};

/**
 * Adds a book to a specific shelf
 * @function addBookToShelf
 * @param {Object} params - Parameters for adding a book to a shelf
 * @param {string} params.shelfId - The ID of the shelf to add the book to
 * @param {string} params.bookId - The ID of the book to add
 * @param {string} params.owner - The ID of the user who owns the shelf
 * @returns {Promise<{ shelfBookId: string, userBookId: string, addedAt: string }>} - The IDs of the created shelf_book and user_book entries, and the timestamp of when the book was added to the shelf
 */
export const addBookToShelf = async ({ shelfId, bookId, owner }: { shelfId: string, bookId: string, owner: string }): Promise<{ shelfBookId: string, userBookId: string, addedAt: string }> => {
  let userBookId = ''
  let shelfBookId = ''
  let addedAt = ''
  // insert in user_book
  try {
    const insertUserBookTableResult = await pool.query<UserBookRow>(`
        INSERT INTO "user_book" (id, status, user_id, book_id)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, book_id) DO NOTHING
        RETURNING *;
        `,
      [uuidv4(), BookStatus.TO_READ, owner, bookId]
    )
    if (insertUserBookTableResult.rows.length !== 0 && insertUserBookTableResult.rows[0]) {
      userBookId = insertUserBookTableResult.rows[0].id
    }
    // There was a conflict (i.e. a user has already added this book to a shelf before),
    // but we want a user to be able to add this book to a different shelf,
    // so fetch their existing entry
    else if (insertUserBookTableResult.rows.length === 0) {
      const selectUserBookTableResult = await pool.query(`
        SELECT * FROM "user_book"
        WHERE book_id = $1 AND user_id = $2
        `,
        [bookId, owner]
      )
      userBookId = selectUserBookTableResult.rows[0].id
    }
  } catch (err) {
    console.log('user_book table insert error', err)
    throw err
  }
  // insert in shelf_book
  try {
    const shelfBookResult = await pool.query<ShelfBookRow>(`
        INSERT INTO "shelf_book" (id, shelf_id, user_book_id, added_at)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (shelf_id, user_book_id) DO NOTHING
        RETURNING id, shelf_id, user_book_id, added_at
        `,
      [uuidv4(), shelfId, userBookId, dayjs(new Date())]
    )

    if (shelfBookResult.rows[0] && shelfBookResult.rows.length !== 0) {
      shelfBookId = shelfBookResult.rows[0].id
      addedAt = shelfBookResult.rows[0].added_at
    }
    return { shelfBookId, userBookId, addedAt }

  } catch (err) {
    console.log('shelf_book table insert error', err)
    throw err
  }
};

/**
 * Deletes a book from a specific shelf
 * @function deleteBookFromShelf
 * @param params - Parameters for deleting a book from a shelf
 * @param {string} params.userBookId - The ID of the user_book entry corresponding to the book being removed
 * @param {string} params.shelfId - The ID of the shelf to remove the book from 
 */
export const deleteBookFromShelf = async ({ userBookId, shelfId }: { userBookId: string, shelfId: string }) => {
  try {
    const result = await pool.query<Shelf>(`
          DELETE FROM "shelf_book"
          WHERE user_book_id = $1 AND shelf_id = $2
          RETURNING *;
        `,
      [userBookId, shelfId]
    )
    if (result.rowCount === 0) {
      throw new HttpError("Unexpected error deleting book from shelf", 500)
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Creates a user book entry
 * @function createUserBook
 * @param {Object} params - Parameters for creating a user book entry
 * @param {string} params.bookId - The ID of the book to add
 * @param {string} params.owner - The ID of the user who owns the book entry
 * @param {BookStatus} [params.status] - The status of the book entry (optional, defaults to "to_read")
 * @returns {Promise<UserBookRow>} - The created user book entry
 */
export const createUserBook = async ({ bookId, owner, status }: { bookId: string, owner: string, status?: BookStatus }): Promise<UserBookRow> => {
  // insert in user_book
  try {
    const insertUserBookTableResult = await pool.query<UserBookRow>(`
        INSERT INTO "user_book" (id, status, user_id, book_id)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, book_id) DO NOTHING
        RETURNING *;
        `,
      [uuidv4(), status || BookStatus.TO_READ, owner, bookId]
    )
    if (insertUserBookTableResult.rows.length === 0) {
      throw new HttpError("A user_book for this user and book already exists.", 409)
    }
    const createdUserBook = insertUserBookTableResult.rows[0]

    if (!createdUserBook) {
      throw new HttpError("Database failed to create record.", 500)
    }
    return createdUserBook
  } catch (err) {
    console.log('user_book table insert error', err)
    throw err
  }
};

/**
 * Updates a user's book entry with new status, rating, or read date
 * @function updateUserBook
 * @param {Object} params - Parameters for updating a user's book entry
 * @param {string} params.owner - The ID of the user who owns the book entry
 * @param {string} params.userBookId - The ID of the user_book entry to update
 * @param {BookStatus} [params.status] - The new status of the book (optional)
 * @param {number} [params.rating] - The new rating of the book (optional)
 * @param {string} [params.readAt] - The new read date of the book in ISO format (optional)
 */
export const updateUserBook = async ({ owner, userBookId, status, rating, readAt }: { owner: string, userBookId: string, status?: BookStatus, rating?: number | undefined, readAt?: string }) => {
  try {
    let readAtDate: Dayjs | string | undefined = readAt
    if (!readAt && status === BookStatus.READ) readAtDate = dayjs(new Date())
    const result = await pool.query<UserBookRow>(`
          UPDATE "user_book"
          SET
            status = COALESCE($1, status),
            user_rating = COALESCE($2, user_rating),
            read_at = COALESCE($3, read_at)
          WHERE user_id = $4 AND id = $5
          RETURNING *;
        `,
      [status, rating, readAtDate, owner, userBookId]
    )
    if (result.rows.length === 0) {
      throw new HttpError("Unexpected error updating shelf", 500)
    }
    console.log('updated user_book entry', result.rows[0])
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Gets a user's book entry for a specific book
 * @function getUserBook
 * @param {Object} params - Parameters for retrieving a user's book entry
 * @param {string} params.owner - The ID of the user who owns the book entry
 * @param {string} params.bookId - The ID of the book to retrieve the user_book entry for
 * @returns {Promise<UserBook | undefined>} - A user_book entry for the specified book and user
 */
export const getUserBook = async ({ owner, bookId }: { owner: string, bookId: string }): Promise<UserBook | undefined> => {
  try {
    const result = await pool.query<UserBookRow>(`
        SELECT * FROM "user_book"
        WHERE user_id = $1 AND book_id = $2
        `,
      [owner, bookId]
    )
    if (result.rows.length === 0 || result === undefined) {
      throw new HttpError("User book entry not found.", 404)
    }
    const mappedResult = result.rows.map((userBook) => mapDbUserBookToUserBook(userBook))
    return mappedResult[0]
  } catch (err) {
    console.error(err);
    throw err;
  }
};