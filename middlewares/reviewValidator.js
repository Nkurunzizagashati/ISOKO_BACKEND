const createReviewValidator = {
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
	rating: {
		notEmpty: {
			errorMessage: 'Rating should not be empty',
		},
		isInt: {
			options: { min: 1, max: 5 },
			errorMessage: 'Rating should be an integer between 1 and 5',
		},
	},
	comment: {
		notEmpty: {
			errorMessage: 'Comment should not be empty',
		},
		isString: {
			errorMessage: 'Comment should be a string',
		},
	},
};

const deleteReviewValidator = {
	reviewId: {
		in: ['params'],
		notEmpty: {
			errorMessage:
				'You need to provide an ID for the review you want to delete',
		},
		isMongoId: {
			errorMessage: 'Review ID should be a valid ObjectId',
		},
	},
};

const updateReviewValidator = {
	rating: {
		optional: { options: { nullable: true } },
		isInt: {
			options: { min: 1, max: 5 },
			errorMessage: 'Rating should be an integer between 1 and 5',
		},
	},
	comment: {
		optional: { options: { nullable: true } },
		notEmpty: {
			errorMessage: 'Comment should not be empty',
		},
		isString: {
			errorMessage: 'Comment should be a string',
		},
	},
};

const getReviewsValidator = {
	service: {
		notEmpty: {
			errorMessage: 'Service id should not be empty',
		},
		isString: {
			errorMessage: 'Service id should be a string',
		},
	},
};

export {
	createReviewValidator,
	deleteReviewValidator,
	updateReviewValidator,
	getReviewsValidator,
};
