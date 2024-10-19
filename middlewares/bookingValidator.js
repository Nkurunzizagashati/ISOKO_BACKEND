const createBookingValidator = {
	consumer: {
		notEmpty: {
			errorMessage: 'Consumer ID should not be empty',
		},
		isMongoId: {
			errorMessage: 'Consumer should be a valid ObjectId',
		},
	},
	provider: {
		notEmpty: {
			errorMessage: 'Provider ID should not be empty',
		},
		isMongoId: {
			errorMessage: 'Provider should be a valid ObjectId',
		},
	},
	service: {
		notEmpty: {
			errorMessage: 'Service ID should not be empty',
		},
		isMongoId: {
			errorMessage: 'Service should be a valid ObjectId',
		},
	},
	date: {
		notEmpty: {
			errorMessage: 'Booking date should not be empty',
		},
		isISO8601: {
			errorMessage:
				'Booking date should be a valid date format (ISO 8601)',
		},
	},
	timeSlot: {
		notEmpty: {
			errorMessage: 'Time slot should not be empty',
		},
		isString: {
			errorMessage: 'Time slot should be a string',
		},
	},
	status: {
		optional: { options: { nullable: true } },
		isIn: {
			options: [
				['pending', 'confirmed', 'canceled', 'completed'],
			],
			errorMessage:
				'Status should be one of the following: pending, confirmed, canceled, completed',
		},
	},
	notes: {
		optional: { options: { nullable: true } },
		isString: {
			errorMessage: 'Notes should be a string',
		},
	},
};

const deleteBookingValidator = {
	bookingId: {
		in: ['params'],
		notEmpty: {
			errorMessage:
				'You need to provide an ID for the booking you want to delete',
		},
		isMongoId: {
			errorMessage: 'Booking ID should be a valid ObjectId',
		},
	},
};

const updateBookingValidator = {
	date: {
		optional: { options: { nullable: true } },
		notEmpty: {
			errorMessage: 'Booking date should not be empty',
		},
		isISO8601: {
			errorMessage:
				'Booking date should be a valid date format (ISO 8601)',
		},
	},
	timeSlot: {
		optional: { options: { nullable: true } },
		notEmpty: {
			errorMessage: 'Time slot should not be empty',
		},
		isString: {
			errorMessage: 'Time slot should be a string',
		},
	},
	status: {
		optional: { options: { nullable: true } },
		isIn: {
			options: [
				['pending', 'confirmed', 'canceled', 'completed'],
			],
			errorMessage:
				'Status should be one of the following: pending, confirmed, canceled, completed',
		},
	},
	notes: {
		optional: { options: { nullable: true } },
		isString: {
			errorMessage: 'Notes should be a string',
		},
	},
};

export {
	createBookingValidator,
	deleteBookingValidator,
	updateBookingValidator,
};
