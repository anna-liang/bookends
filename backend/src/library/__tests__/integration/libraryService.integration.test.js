import request from 'supertest';
import app from '../../../app.ts';
import { beforeEach, describe, expect, it } from '@jest/globals';
// import * as libraryService from "../../services/library.services.ts";
import { pool } from "../../../db.ts";
import { ShelfPrivacy } from '../../models/library.models.ts';
// import type { QueryResult } from 'pg';
import { HttpError } from '../../../utils/HttpError.ts';

jest.mock('redis');

jest.mock('pg');

jest.mock('../../../middleware/auth.middleware.ts');

const mockedPool = jest.mocked(pool);
const API_BASE = '/shelves';

describe('Library Service Unit Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await mockedPool.end(); // Shut down pool connections
    });

    describe('createShelf', () => {
        it('should successfully create a shelf and return the result', async () => {
            const mockShelfData = {
                name: 'Shelf Name',
                owner: 'user123',
                privacy: ShelfPrivacy.private,
                description: 'This is a shelf description'
            };

            const mockResult = {
                rows: [{ id: 'shelf123', ...mockShelfData }],
                rowCount: 1,
            }

            // Mock the database response
            mockedPool.query.mockResolvedValue(mockResult);

            const response = await request(app).post(`${API_BASE}`).send(mockShelfData)

            // Assertions
            expect(mockedPool.query).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toBe(200);
            expect(response.body.id).toBe('shelf123');
            expect(response.body.name).toBe('Shelf Name');
        });

        it('should throw an error if shelf of same name exists', async () => {
            const mockShelfData = {
                name: 'Shelf Name',
                owner: 'user123',
                privacy: ShelfPrivacy.public,
            }

            const mockResult = {
                rows: [],
                rowCount: 0,
            }

            mockedPool.query.mockResolvedValue(mockResult);

            const response = await request(app).post(`${API_BASE}`).send(mockShelfData)
            expect(mockedPool.query).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toBe(409);
            expect(response.body.error).toBe('A shelf with this name already exists.');
        });
    });

    describe('getShelves', () => {
        it('should return an array of shelves for a specific owner', async () => {
            const mockResult = {
                rows: [
                    { id: '1', name: 'book1', owner: 'user123' },
                    { id: '2', name: 'book2', owner: 'user123' }
                ],
                rowCount: 2,
            }

            mockedPool.query.mockResolvedValue(mockResult);

            const response = await request(app).get(`${API_BASE}`).send({ owner: 'user123' })

            expect(mockedPool.query).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body[0].name).toBe('book1');
            expect(response.body[1].name).toBe('book2');
        });

        it('should return an empty array if owner has no shelves', async () => {
            const mockResult = {
                rows: [],
                rowCount: 0,
            }

            mockedPool.query.mockResolvedValue(mockResult);

            const response = await request(app).get(`${API_BASE}`).send({ owner: 'user123' })

            expect(mockedPool.query).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveLength(0);
        });
    });

    describe('getShelf', () => {
        it('should return specified shelf for owner', async () => {
            // Shelf Query
            mockedPool.query.mockResolvedValueOnce({
                rows: [
                    { id: '1', name: 'shelf123', owner: 'user123', description: '', privacy: ShelfPrivacy.private, createdAt: new Date(), updatedAt: new Date() }
                ],
                rowCount: 1,
            });
            // Books Query
            mockedPool.query.mockResolvedValueOnce({
                rows: [{ id: 'b123', title: 'book1', authors: ['author1'] }],
                rowCount: 1,
            });

            const response = await request(app).get(`${API_BASE}/shelf123`).send({ shelfId: 'shelf123', owner: 'user123' })

            expect(mockedPool.query).toHaveBeenCalledTimes(2);
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBe('shelf123');
            expect(response.body.books).toBeDefined();
        });

        it('should throw an error if shelf is not found', async () => {
            const mockResult = {
                rows: [],
                rowCount: 0,
            }

            mockedPool.query.mockResolvedValueOnce(mockResult);

            const response = await request(app).get(`${API_BASE}/shelf123`).send({ owner: 'user123' })
            expect(mockedPool.query).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toBe('Shelf not found.');
        });

        it('should throw an error if books not found', async () => {
            // Shelf Query
            mockedPool.query.mockResolvedValueOnce({
                rows: [
                    { id: '1', name: 'shelf123', owner: 'user123', description: '', privacy: ShelfPrivacy.private, createdAt: new Date(), updatedAt: new Date() }
                ],
                rowCount: 1,
            });
            // Books Query
            mockedPool.query.mockResolvedValueOnce({
                rows: undefined,
                rowCount: 0,
            });

            const response = await request(app).get(`${API_BASE}/shelf123`).send({ shelfId: 'shelf123', owner: 'user123' })
            expect(mockedPool.query).toHaveBeenCalledTimes(2);
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toBe('Books not found.');
        });
    });
});