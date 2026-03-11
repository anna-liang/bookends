# Library
1. **Create a New Shelf**

    `POST /api/shelves`

    **Description:** Creates a new book shelf for the authenticated user.

    - Auth Required: Yes

    - Body Parameters:
        - name (string, **Required**): The title of the shelf
        - description (string, Optional): A brief summary of the shelf.
        - privacy (string, **Required**): Visibility setting (e.g., public, private).

    - Status Codes:
        - `200 OK` - Shelf created successfully.
        - `400 Bad Request` - Missing `name` or `privacy` in request body.
        - `401 Unauthorized` - User not logged in.
        - `500 Error` - Database or Service error.

2. **Update Shelf Details**

    `PATCH /api/shelves/:shelfId`

    **Description:** Updates the metadata for an existing shelf.

    - Auth Required: Yes

    - URL Parameters: `shelfId` (string)

    - Body Parameters:
        - name (string, Optional): The title of the shelf
        - description (string, Optional): A brief summary of the shelf.
        - privacy (string, optional): Visibility setting (e.g., public, private).
    - Status Codes:
        - `200 OK` - Shelf updated successfully.
        - `400 Bad Request` - Missing `shelfId` in URL.
        - `401 Unauthorized` - User not logged in.
        - `500 Error` - Database or Service error.

3. **Lists All User Shelves**

    `GET /api/shelves`

    **Description:** Returns an array of all shelves owned by the authenticated user.

    - Auth Required: Yes

    - Success Response: `Shelf[]` (Returns `[]` if no shelves exist).

    - Status Codes:
        - `200 OK` - Shelves retrieved successfully.
        - `401 Unauthorized` - User not logged in.
        - `500 Error` - Database or Service error.

4. **Get Single Shelf Details**

    `GET /api/shelves/:shelfId`

    **Description:** Retrieves metadata and book list for a specific `shelfId`.

    - Auth Required: Yes

    - URL Parameters: `shelfId` (string)

    - Success Response: `Shelf`

    - Status Codes:
        - `200 OK` - Shelf retrieved successfully.
        - `400 Bad Request` - Missing `shelfId` in URL.
        - `401 Unauthorized` - User not logged in.
        - `500 Error` - Database or Service error.

5. **Add Book To Shelf**

    `POST /api/shelves/:shelfId/books/:bookId`

    **Description:** Links a book to a specific shelf.

    - Auth Required: Yes

    - URL Parameters: `shelfId` (string) and `bookId` (string)

    - Status Codes:
        - `200 OK` - Book added successfully.
        - `400 Bad Request` - Missing `shelfId` or `bookId` in URL.
        - `401 Unauthorized` - User not logged in.
        - `500 Error` - Database or Service error.

6. **Delete Book From Shelf**

    `DELETE /api/shelves/:shelfId/books/:userBookId`

    **Description:** Deletes the link between a book from a specific shelf.

    - Auth Required: Yes

    - URL Parameters: `shelfId` (string) and `userBookId` (string)

    - Status Codes:
        - `200 OK` - Book deleted successfully.
        - `400 Bad Request` - Missing `shelfId` or `userBookId` in URL.
        - `401 Unauthorized` - User not logged in.
        - `500 Error` - Database or Service error.

7. **Get Single User Book**

    `GET /api/shelves/books/:bookId`

    **Description:** Gets a user's book data related to a specific book.

    - Auth Required: Yes

    - URL Parameters: `userBookId` (string)

    - Status Codes:
        - `200 OK` - User Book retrieved successfully.
        - `400 Bad Request` - Missing `userBookId` in URL.
        - `401 Unauthorized` - User not logged in.
        - `500 Error` - Database or Service error.

8. **Update Single User Book**

    `PATCH /api/shelves/books/:userBookId'`

    **Description:** Updates a user's book data for a single book.

    - Auth Required: Yes

    - URL Parameters: `userBookId` (string)

    - Body Parameters:
        - status (string, Optional): The reading status.
        - rating (string, Optional): A users's rating.
        - readAt (string, Optional): Date read.

    - Status Codes:
        - `200 OK` - User Book updated successfully.
        - `400 Bad Request` - Missing `userBookId` in URL.
        - `401 Unauthorized` - User not logged in.
        - `500 Error` - Database or Service error.