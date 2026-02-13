import express from 'express';
import {
    getRecommendationsForUser, getRecommendationsForBook, getRecommendationsForShelf
} from '../controllers/recommendations.controllers.ts';
import { isUserLoggedIn } from '../../middleware/auth.middleware.ts';

const router = express.Router();

router.get('/user', isUserLoggedIn, getRecommendationsForUser);
router.get('/book/:bookId', isUserLoggedIn, getRecommendationsForBook);
router.get('/shelf/:shelfId', isUserLoggedIn, getRecommendationsForShelf);

export default router;
