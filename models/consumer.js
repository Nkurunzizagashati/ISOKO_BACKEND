import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const consumerSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	profileImage: {
		type: String, // URL to the profile image
	},
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review', // Links to reviews left by this user
		},
	],
	userType: {
		type: String,
		default: 'consumer',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Consumer = mongoose.model('Consumer', consumerSchema);

export default Consumer;
