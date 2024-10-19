import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const bookingSchema = new Schema({
	consumer: {
		type: Schema.Types.ObjectId,
		ref: 'User', // Links to the consumer
		required: true,
	},
	provider: {
		type: Schema.Types.ObjectId,
		ref: 'User', // Links to the service provider
		required: true,
	},
	service: {
		type: Schema.Types.ObjectId,
		ref: 'Service', // Links to the specific service
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	timeSlot: {
		type: String, // The selected time slot for the booking (e.g., '2:00 PM - 3:00 PM')
		required: true,
	},
	status: {
		type: String,
		enum: ['pending', 'confirmed', 'canceled', 'completed'],
		default: 'pending',
	},
	notes: {
		type: String, // Special requests or notes from the consumer
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
