const createReviewValidator = {
	rating: {
		notEmpty: {
			errorMessage: 'Rating should not be empty',
		},
		isFloat: {
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
