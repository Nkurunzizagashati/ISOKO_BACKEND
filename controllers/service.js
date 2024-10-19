import jwt from 'jsonwebtoken';
import { matchedData, validationResult } from 'express-validator';
import Service from '../models/service.js';
import { cloudinaryFileUpload } from '../utils/cloudinary.js';
import fs from 'fs';
import Provider from '../models/provider.js';

const createService = async (req, res) => {
	try {
		const result = validationResult(req);

		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ errors: result.array()[0].msg });
		}

		const data = matchedData(req);
		const authHeader = req.headers.authorization;
		let accessToken =
			authHeader && authHeader.startsWith('Bearer ')
				? authHeader.split(' ')[1]
				: null;

		if (!accessToken) {
			return res.status(401).json({
				message: 'Not authorized',
			});
		}

		const decodedAccessToken = jwt.decode(
			accessToken,
			process.env.JWT_SECRET
		);

		if (!decodedAccessToken) {
			return res.status(403).json({ message: 'Not authorized' });
		}

		const provider = await Provider.findOne({
			email: decodedAccessToken.email,
		});

		if (!provider) {
			return res.status(403).json({ message: 'Not authorized' });
		}

		data.provider = provider._id;

		// Check if images exist in the request
		if (req.files && req.files.length > 0) {
			// Array to hold the URLs of uploaded images
			const images = [];

			// Upload each file to Cloudinary and store the URL
			for (const file of req.files) {
				const uploadedImage = await cloudinaryFileUpload(
					file,
					`${provider.email}/images`,
					res
				);
				images.push(uploadedImage.url);

				// Delete the local file after successful upload
				fs.unlink(file.path, (err) => {
					if (err) {
						console.error(
							'Failed to delete local file:',
							err
						);
					}
				});
			}

			// Save the array of image URLs in the data object
			data.images = images;
		}

		const createdService = await Service.create(data);

		await Provider.findByIdAndUpdate(data.provider, {
			$push: { services: createdService._id },
		});

		return res.status(200).json({
			message: 'Service created successfully',
			accessToken,
		});
	} catch (error) {
		console.error('Error in creating service:', error.message);
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

const getAllServices = async (req, res) => {
	try {
		const services = await Service.find().populate('provider');
		if (services.length === 0) {
			return res
				.status(404)
				.json({ message: 'No service found' });
		}

		return res.status(200).json({ services });
	} catch (error) {
		console.log(error.message);
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

export { createService, getAllServices };
