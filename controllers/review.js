import { matchedData, validationResult } from 'express-validator';
import ServiceReview from '../models/review.js';
import jwt from 'jsonwebtoken';
import Consumer from '../models/consumer.js';

const getReviews = async (req, res) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ errors: result.array()[0].msg });
		}

		const data = matchedData(req);
		const reviews = await Review.find({ service: data.service });

		if (!reviews)
			return res
				.status(404)
				.json({ message: 'No reviews found' });

		return res.status(200).json({ reviews: reviews });
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

const addReview = async (req, res) => {
	try {
		const result = validationResult(req);

		if (!result.isEmpty())
			return res
				.status(400)
				.json({ errors: result.array()[0].msg });

		const data = matchedData(req);

		const authHeader = req.headers.authorization;
		let accessToken =
			authHeader && authHeader.startsWith('Bearer ')
				? authHeader.split(' ')[1]
				: null;

		if (!accessToken)
			return res.status(401).json({ message: 'Not authorized' });

		const decodedAccessToken = jwt.decode(
			accessToken,
			process.env.JWT_SECRET
		);

		if (!decodedAccessToken) {
			return res.status(401).json({ message: 'Not authorized' });
		}

		const user = await Consumer.findOne({
			email: decodedAccessToken.email,
		});

		if (!user) {
			return res.status(401).json({ message: 'Not authorized' });
		}

		data.consumer = user._id;

		const createdReview = await ServiceReview.create(data);

		return res.status(201).json({
			review: createdReview,
			message: 'Review created successfully',
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'something went wrong' });
	}
};

export { addReview, getReviews };
