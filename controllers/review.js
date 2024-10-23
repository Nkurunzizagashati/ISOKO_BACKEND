import { matchedData, validationResult } from 'express-validator';
import ServiceReview from '../models/review.js';
import jwt from 'jsonwebtoken';
import Consumer from '../models/consumer.js';
import Service from '../models/service.js';

const getReviews = async (req, res) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ errors: result.array()[0].msg });
		}

		const data = matchedData(req);
		const reviews = await ServiceReview.find({
			service: data.service,
		});

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
		const serviceId = req.params.serviceId;

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

		const decodedAccessToken = jwt.verify(
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

		const service = await Service.findById(serviceId);

		data.consumer = user._id;
		data.service = service._id;

		console.log(`Service: ${service._id}`);

		console.log(`Consumer: ${user._id}`);

		const createdReview = await ServiceReview.create(data);
		if (!service) {
			return res
				.status(404)
				.json({ message: 'Service not found' });
		}

		console.log('createdReview: ' + createdReview);

		service.reviews.push(createdReview._id);
		await service.save();

		return res.status(201).json({
			review: createdReview,
			message: 'Review created successfully',
		});
	} catch (error) {
		console.log(error.message);
		return res
			.status(500)
			.json({ message: 'something went wrong' });
	}
};

export { addReview, getReviews };
