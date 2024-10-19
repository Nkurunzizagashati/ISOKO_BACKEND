import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
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
		type: String,
	},
	services: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Service',
		},
	],
	availability: {
		type: Map,
		of: [String],
	},
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review',
		},
	],
	userType: {
		type: String,
		default: 'provider',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Provider = mongoose.model('Provider', providerSchema);
export default Provider;
