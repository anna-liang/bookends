# Recommendations
1. **Get Recommendations For User**

    `GET /api/recommendations/user`

    **Description:** Returns recommendations based on all of authenticated user's books.

    - Auth Required: Yes

    - Query Parameter: `limit` (string, Optional)

    - Success Response: List of books and book metadata.

    - Status Codes:
        - `200 OK` - Recommendations retrieved successfully.
        - `401 Unauthorized` - User not logged in.
        - `500 Error` - Database or Service error.

2. **Get Recommendations For Book**

    `GET /api/recommendations/book/:bookId`

    **Description:** Returns recommendations based on a specific book.

    - Auth Required: Yes

    - Query Parameter: `limit` (string, Optional)

    - URL Parameter: `bookId` (string)

    - Success Response: List of books and book metadata.

    - Status Codes:
        - `200 OK` - Recommendations retrieved successfully.
        - `400 Bad Request` - Missing `bookId` in URL.
        - `401 Unauthorized` - User not logged in.
        - `500 Error` - Database or Service error.

3. **Get Recommendations For Shelf**

    `GET /api/recommendations/shelf/:shelfId`

    **Description:** Returns recommendations based on a specific shelf.

    - Auth Required: Yes

    - Query Parameter: `limit` (string, Optional)

    - URL Parameter: `shelfId` (string)

    - Success Response: List of books and book metadata.

    - Status Codes:
        - `200 OK` - Recommendations retrieved successfully.
        - `400 Bad Request` - Missing `shelfId` in URL.
        - `401 Unauthorized` - User not logged in.
        - `500 Error` - Database or Service error.