import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const reviewSchema = new Schema({
	consumer: {
		type: Schema.Types.ObjectId,
		ref: 'Consumer',
		required: true,
	},
	service: {
		type: Schema.Types.ObjectId,
		ref: 'Service',
		required: true,
	},
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5,
	},
	comment: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const ServiceReview = mongoose.model('Review', reviewSchema);

export default ServiceReview;
