import express from 'express';
import { getBooks, getBookById } from '../controllers/books.controllers.ts';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);

export default router;
