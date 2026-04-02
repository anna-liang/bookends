import { jest } from '@jest/globals'
import type { Request, NextFunction } from 'express';

export const isUserLoggedIn = jest.fn((req: Request, res, next: NextFunction) => {
    req.user = {
        id: '123',
        firstName: 'User',
        email: 'test@example.com',
        createdAt: new Date().toISOString(),
    };

    return next();
});

export default {
    isUserLoggedIn,
};