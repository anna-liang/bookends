# Books
1. **Lists All Books**

    `GET /api/books`

    **Description:** Returns an array of books from Google matching query `q`.

    - Auth Required: No

    - Query Parameters: `q` (string)

    - Success Response: `Book[]`

    - Status Codes:
        - `200 OK` - Books retrieved successfully.
        - `400 Bad Request` - Missing `q` in query parameter.
        - `500 Error` - Database or Service error.

2. **Get Single Book Details**

    `GET /api/books/:bookId`

    **Description:** Retrieves metadata for a specific `bookId` from Google.

    - Auth Required: No

    - URL Parameters: `bookId` (string)

    - Success Response: `Book`

    - Status Codes:
        - `200 OK` - Book retrieved successfully.
        - `400 Bad Request` - Missing `bookId` in URL.
        - `500 Error` - Database or Service error.
