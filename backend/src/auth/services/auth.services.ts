import { pool } from '../../db.ts';
import type { UserRow } from '../models/auth.models.ts';
import type { GoogleUserProfile } from '../models/auth.dto.ts';
import dayjs from 'dayjs';

export const findOrCreateUser = async (profile: GoogleUserProfile) => {
  try {
    const result = await pool.query<UserRow>(`
        INSERT INTO "user" (id, first_name, last_name, email, picture, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO NOTHING
        RETURNING id, first_name, last_name, email, picture, created_at
        `,
        [profile.id, profile.given_name, profile.family_name, profile.email, profile.picture, dayjs(new Date())]
    )

    if (!result.rows) {
      throw new Error("Failed to insert or update user");
    }

    let returnedUser: UserRow | undefined = result.rows[0]
    // User already exists
    if (result.rows.length === 0) {
        console.log('user exists')
      const existing = await pool.query<UserRow>(
        `SELECT id, first_name, last_name, email, picture, created_at FROM "user" WHERE id = $1`,
        [profile.id]
      );
      returnedUser = existing.rows[0]
    }

    const user = {
        id: returnedUser?.id,
        firstName: returnedUser?.first_name,
        lastName: returnedUser?.last_name,
        email: returnedUser?.email,
        picture: returnedUser?.picture,
        createdAt: returnedUser?.created_at
    }
    return user
  } catch (err) {
    console.error(err);
    throw err;
  }
};

