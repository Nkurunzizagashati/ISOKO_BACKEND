const createServiceValidator = {
	name: {
		notEmpty: {
			errorMessage: 'Service name should not be empty',
		},
		isString: {
			errorMessage: 'Service name should be a string',
		},
	},
	description: {
		optional: { options: { nullable: true } },
		isString: {
			errorMessage: 'Description should be a string',
		},
	},
	price: {
		notEmpty: {
			errorMessage: 'Price should not be empty',
		},
		isFloat: {
			options: { min: 0 },
			errorMessage:
				'Price should be a valid number and greater than 0',
		},
	},
	category: {
		notEmpty: {
			errorMessage: 'Category should not be empty',
		},
		isString: {
			errorMessage: 'Category should be a string',
		},
	},
	images: {
		optional: { options: { nullable: true } },
		isArray: {
			errorMessage: 'Images should be an array',
		},
		custom: {
			options: (value) =>
				value.every((img) => typeof img === 'string'),
			errorMessage: 'Each image should be a string (URL or path)',
		},
	},
};

const deleteServiceValidator = {
	serviceId: {
		in: ['params'],
		notEmpty: {
			errorMessage:
				'You need to provide an ID for the service you want to delete',
		},
		isMongoId: {
			errorMessage: 'Service ID should be a valid ObjectId',
		},
	},
};

const updateServiceValidator = {
	name: {
		optional: { options: { nullable: true } },
		notEmpty: {
			errorMessage: 'Service name should not be empty',
		},
		isString: {
			errorMessage: 'Service name should be a string',
		},
	},
	description: {
		optional: { options: { nullable: true } },
		isString: {
			errorMessage: 'Description should be a string',
		},
	},
	price: {
		optional: { options: { nullable: true } },
		notEmpty: {
			errorMessage: 'Price should not be empty',
		},
		isFloat: {
			options: { min: 0 },
			errorMessage:
				'Price should be a valid number and greater than 0',
		},
	},
	category: {
		optional: { options: { nullable: true } },
		notEmpty: {
			errorMessage: 'Category should not be empty',
		},
		isString: {
			errorMessage: 'Category should be a string',
		},
	},
	images: {
		optional: { options: { nullable: true } },
		isArray: {
			errorMessage: 'Images should be an array',
		},
		custom: {
			options: (value) =>
				value.every((img) => typeof img === 'string'),
			errorMessage: 'Each image should be a string (URL or path)',
		},
	},
};

export {
	createServiceValidator,
	deleteServiceValidator,
	updateServiceValidator,
};
