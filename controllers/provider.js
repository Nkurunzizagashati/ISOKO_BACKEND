import { matchedData, validationResult } from 'express-validator';
import { comparePasswords, hashPassword } from '../utils/helpers.js';
import {
	generateJWTauthToken,
	generateJWTrefreshToken,
} from '../utils/authTokens.js';
import RefreshToken from '../models/token.js';
import { cloudinaryFileUpload } from '../cloudinary.js';
import fs from 'fs';
import Provider from '../models/provider.js';

const getAllProviders = async (req, res) => {
	try {
		const users = await Provider.find();
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

const registerProvider = async (req, res) => {
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
		const existingProvider = await Provider.findOne({
			email: data.email,
		});
		if (existingProvider) {
			return res
				.status(400)
				.json({ message: 'Email already registered' });
		}

		// Check if profile image exists in request
		if (req.file) {
			const profileImage = await cloudinaryFileUpload(
				req.file,
				'provider_profile_images',
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

		// REGISTER PROVIDER
		const provider = await Provider.create(data);

		// GENERATE TOKENS
		const accessToken = generateJWTauthToken({
			email: provider.email,
		});
		const refreshToken = generateJWTrefreshToken({
			email: provider.email,
		});
		const expiresAt = new Date();
		expiresAt.setDate(expiresAt.getDate() + 7);

		await RefreshToken.create({
			token: refreshToken,
			userId: provider._id,
			expiresAt,
		});

		const populatedProvider = await Provider.findById(
			provider._id
		).populate('services');

		const providerData = populatedProvider.toObject();
		delete providerData.password;

		res.status(201).json({
			message: 'Provider registered successfully',
			token: accessToken,
			user: providerData,
		});
	} catch (error) {
		console.error('Error in registration:', error.message);
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

const loginProvider = async (req, res) => {
	console.log(req.body);
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({ errors: result.array()[0].msg });
		}

		const data = matchedData(req);
		const { email, password } = data;
		const provider = await Provider.findOne({ email });
		if (!provider) {
			return res
				.status(404)
				.json({ message: 'Provider not found' });
		}

		const passwordsMatch = await comparePasswords(
			password,
			provider.password
		);

		if (!passwordsMatch) {
			return res
				.status(401)
				.json({ message: 'Invalid credentials' });
		}

		const accessToken = generateJWTauthToken({
			email: provider.email,
		});
		const refreshToken = generateJWTrefreshToken({
			email: provider.email,
		});
		const expiresAt = new Date();
		expiresAt.setDate(expiresAt.getDate() + 7);

		await RefreshToken.create({
			token: refreshToken,
			userId: provider._id,
			expiresAt,
		});

		const populatedProvider = await Provider.findById(
			provider._id
		).populate('services');

		console.log(populatedProvider);

		const providerData = populatedProvider.toObject();
		delete providerData.password;
		res.status(200).json({
			message: 'Logged in successfully',
			token: accessToken,
			user: providerData,
		});
	} catch (error) {
		console.log(error.message);
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

export { getAllProviders, registerProvider, loginProvider };
