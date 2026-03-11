# Auth
1. **Google Sign In**

    `GET /api/auth/google`

    **Description:** Logs in a user through Google and find or create a user in the database.

    - Auth Required: No

    - Status Codes:
        - `200 OK` - Shelf created successfully.
        - `500 Error` - Database or Service error.

2. **Google Callback**

    `GET /api/auth/google/callback`

    **Description:** Callback for Google. Redirectes based on success or failure.

    - Auth Required: No

3. **Get User Data**

    `GET /api/auth/me`

    **Description:** Returns a user's personal details.

    - Auth Required: No

    - Success Response: `IUser`

    - Status Codes:
        - `200 OK` - User retrieved successfully.
        - `500 Error` - Database or Service error.

4. **Logout A User**

    `GET /api/auth/logout`

    **Description:** Logs an authenticated user out.

    - Auth Required: Yes

    - Status Codes:
        - `200 OK` - Shelf retrieved successfully.
        - `401 Unauthorized` - User not logged in.
        - `500 Error` - Database or Service error.
