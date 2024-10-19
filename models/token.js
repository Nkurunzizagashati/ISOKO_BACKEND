import mongoose from 'mongoose';

const refreshJWTtoken = new mongoose.Schema({
	token: {
		type: String,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	expiresAt: {
		type: Date,
		required: true,
	},
});

const RefreshToken = mongoose.model('RefreshToken', refreshJWTtoken);

export default RefreshToken;
