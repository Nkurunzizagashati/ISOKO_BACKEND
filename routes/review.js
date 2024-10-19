import express from 'express';
import { addReview, getReviews } from '../controllers/review.js';
import { checkSchema } from 'express-validator';
import {
	createReviewValidator,
	getReviewsValidator,
} from '../middlewares/reviewValidator.js';

const router = express.Router();

router.get('/', checkSchema(getReviewsValidator), getReviews);

router.post('/', checkSchema(createReviewValidator), addReview);

export default router;
