import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const serviceSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	provider: {
		type: Schema.Types.ObjectId,
		ref: 'Provider',
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	images: {
		type: [String],
		default: [],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
