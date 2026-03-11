import { pool } from '../../db.ts';
import type { IUser, UserRow } from '../models/auth.models.ts';
import type { GoogleUserProfile } from '../models/auth.dto.ts';
import dayjs from 'dayjs';

/**
 * Finds an existing user or creates a new one based on their Google profile
 * @function findOrCreateUser
 * @param {GoogleUserProfile} profile - The Google user profile containing user information
 * @returns {Promise<IUser>} - A promise resolving to the found or created user
 */
export const findOrCreateUser = async (profile: GoogleUserProfile): Promise<IUser> => {
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
      const existing = await pool.query<UserRow>(
        `SELECT id, first_name, last_name, email, picture, created_at FROM "user" WHERE id = $1`,
        [profile.id]
      );
      returnedUser = existing.rows[0]
    }

    const user: IUser = {
      id: returnedUser?.id || '',
      firstName: returnedUser?.first_name || '',
      lastName: returnedUser?.last_name || '',
      email: returnedUser?.email || '',
      picture: returnedUser?.picture || '',
      createdAt: returnedUser?.created_at || dayjs(new Date()).toISOString()
    }
    return user
  } catch (err) {
    console.error(err);
    throw err;
  }
};

