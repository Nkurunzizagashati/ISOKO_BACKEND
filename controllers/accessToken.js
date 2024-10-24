import jwt from 'jsonwebtoken';
import Consumer from '../models/consumer.js';
import Provider from '../models/provider.js';
import { generateJWTauthToken } from '../utils/authTokens.js';

const generateAccessToken = async (req, res) => {
	try {
		const refreshToken = req.cookies?.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({
				message: 'Unauthorized, no access token found',
			});
		}

		const decodedRefreshToken = await jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET
		);

		const { email } = decodedRefreshToken;

		console.log(email);

		const authConsumer = await Consumer.findOne({ email });
		const authProvider = await Provider.findOne({ email });

		const authUser = authConsumer || authProvider;

		if (!authUser) {
			return res
				.status(401)
				.json({
					message: 'Unauthorized, invalid access token',
				});
		}

		const userData = authUser.toObject();
		delete userData.password;

		const accessToken = generateJWTauthToken({
			email: authUser.email,
		});

		return res.status(200).json({ accessToken, user: userData });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

export default generateAccessToken;
