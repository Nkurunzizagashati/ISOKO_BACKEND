import jwt from 'jsonwebtoken';

const generateJWTauthToken = (payload) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: '1h',
	});

	return token;
};

const generateJWTrefreshToken = (payload) => {
	const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
		expiresIn: '7d',
	});

	return token;
};

export { generateJWTauthToken, generateJWTrefreshToken };
