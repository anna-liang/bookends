import { jest } from '@jest/globals';

const mockPool = {
    query: jest.fn(),
    end: jest.fn().mockResolvedValue(),
    connect: jest.fn().mockResolvedValue({
        query: jest.fn(),
        release: jest.fn(),
    }),
    on: jest.fn(),
};

export const Pool = jest.fn(() => mockPool);

export const Client = jest.fn(() => ({
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
}));

export default {
    Pool,
    Client,
};