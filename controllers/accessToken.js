import RefreshToken from '../models/token.js';

const refreshToken = req.cookies.refreshToken;

try {
	const decodedRefreshToken = jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET
	);

	// Find the refresh token in the database to ensure it's still valid
	const storedToken = await RefreshToken.findOne({
		token: refreshToken,
	});
	if (!storedToken) {
		return res.status(403).json({ message: 'Not authorized' });
	}

	// Generate a new accessToken
	accessToken = generateJWTauthToken({
		email: decodedRefreshToken.email,
	});

	res.setHeader('Authorization', `Bearer ${accessToken}`);
} catch (err) {
	return res.status(403).json({ message: 'Something went wrong' });
}
