const logout = (req, res) => {
	try {
		// Ensure the cookie name matches what you used when setting it
		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) {
			return res
				.status(200)
				.json({ message: 'Already logged out' });
		}

		// Clear cookies and send response
		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'Strict',
		});
		res.status(200).json({ message: 'Logged out successfully' });
	} catch (error) {
		console.error('Error in logging out:', error.message);
		return res
			.status(500)
			.json({ message: 'Something went wrong' });
	}
};

export { logout };
