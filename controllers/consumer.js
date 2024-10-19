import { matchedData, validationResult } from 'express-validator';
import Consumer from '../models/consumer.js';
import { comparePasswords, hashPassword } from '../utils/helpers.js';
import {
	generateJWTauthToken,
	generateJWTrefreshToken,
} from '../utils/authTokens.js';
import RefreshToken from '../models/token.js';
import { cloudinaryFileUpload } from '../cloudinary.js';
import fs from 'fs';
import path from 'path';
// some changes
const getAllConsumers = async (req, res) => {
	try {
		const users = await Consumer.find();
		if (users.length === 0) {
			return res.status(404).json({ message: 'No users found' });
		}
		return res.status(200).json({ users });
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

const registerConsumer = async (req, res) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ errors: result.array()[0].msg });
		}

		const data = matchedData(req);
		const password = data.password;

		// Check for existing email
		const existingConsumer = await Consumer.findOne({
			email: data.email,
		});
		if (existingConsumer) {
			return res
				.status(400)
				.json({ message: 'Email already registered' });
		}

		// Check if profile image exists in request
		if (req.file) {
			const profileImage = await cloudinaryFileUpload(
				req.file,
				'consumer_profile_images',
				res
			);
			data.profileImage = profileImage.url;

			// Delete the local file after successful upload
			fs.unlink(req.file.path, (err) => {
				if (err) {
					console.error('Failed to delete local file:', err);
				}
			});
		}

		const hashedPassword = await hashPassword(password);
		data.password = hashedPassword;

		// REGISTER CONSUMER
		const consumer = await Consumer.create(data);

		// GENERATE TOKENS
		const accessToken = generateJWTauthToken({
			email: consumer.email,
		});
		const refreshToken = generateJWTrefreshToken({
			email: consumer.email,
		});
		const expiresAt = new Date();
		expiresAt.setDate(expiresAt.getDate() + 7);

		await RefreshToken.create({
			token: refreshToken,
			userId: consumer._id,
			expiresAt,
		});

		const consumerData = consumer.toObject();
		delete consumerData.password;

		res.status(201).json({
			message: 'Consumer registered successfully',
			token: accessToken,
			user: consumerData,
		});
	} catch (error) {
		console.error('Error in registration:', error.message);
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

const loginConsumer = async (req, res) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ errors: result.array()[0].msg });
		}

		const data = matchedData(req);
		const { email, password } = data;
		const consumer = await Consumer.findOne({ email });
		if (!consumer) {
			return res.status(404).json({ message: 'User not found' });
		}

		const passwordsMatch = await comparePasswords(
			password,
			consumer.password
		);

		if (!passwordsMatch) {
			return res
				.status(401)
				.json({ message: 'Invalid credentials' });
		}

		const accessToken = generateJWTauthToken({
			email: consumer.email,
		});
		const refreshToken = generateJWTrefreshToken({
			email: consumer.email,
		});
		const expiresAt = new Date();
		expiresAt.setDate(expiresAt.getDate() + 7);

		await RefreshToken.create({
			token: refreshToken,
			userId: consumer._id,
			expiresAt,
		});

		const consumerData = consumer.toObject();
		delete consumerData.password;
		res.status(200).json({
			message: 'Logged in successfully',
			token: accessToken,
			user: consumerData,
		});
	} catch (error) {
		console.log(error.message);
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

export { getAllConsumers, registerConsumer, loginConsumer };
