const createProviderValidator = {
	name: {
		notEmpty: {
			errorMessage: 'Name should not be empty',
		},
		isString: {
			errorMessage: 'Name should be a string',
		},
	},
	email: {
		notEmpty: {
			errorMessage: 'Email should not be empty',
		},
		isEmail: {
			errorMessage: 'Email should be a valid email',
		},
	},
	password: {
		notEmpty: {
			errorMessage: 'Password should not be empty',
		},
		isString: {
			errorMessage: 'Password should be a string',
		},
		isLength: {
			options: {
				min: 6,
				max: 10,
			},
			errorMessage: 'Password should have 6 to 10 characters',
		},
	},
	phone: {
		optional: { options: { nullable: true } },
		isString: {
			errorMessage: 'Phone should be a string',
		},
	},
	services: {
		optional: { options: { nullable: true } },
		isArray: {
			errorMessage: 'Services should be an array of service IDs',
		},
	},
	availability: {
		optional: { options: { nullable: true } },
		isObject: {
			errorMessage:
				'Availability should be an object with days as keys and time slots as values',
		},
	},
};

const loginProviderValidator = {
	email: {
		notEmpty: {
			errorMessage: 'Email should not be empty',
		},
		isEmail: {
			errorMessage: 'Email should be a valid email',
		},
	},
	password: {
		notEmpty: {
			errorMessage: 'Password should not be empty',
		},
		isString: {
			errorMessage: 'Password should be a string',
		},
		isLength: {
			options: {
				min: 6,
				max: 10,
			},
			errorMessage: 'Password should have 6 to 10 characters',
		},
	},
};

const deleteProviderValidator = {
	providerId: {
		in: ['params'],
		notEmpty: {
			errorMessage:
				'You need to provide an ID for the provider you want to delete',
		},
		isString: {
			errorMessage: 'ID should be a string',
		},
	},
};

const updateProviderValidator = {
	name: {
		optional: { options: { nullable: true } },
		notEmpty: {
			errorMessage: 'Name should not be empty',
		},
		isString: {
			errorMessage: 'Name should be a string',
		},
	},
	email: {
		optional: { options: { nullable: true } },
		notEmpty: {
			errorMessage: 'Email should not be empty',
		},
		isEmail: {
			errorMessage: 'Email should be a valid email',
		},
	},
	password: {
		optional: { options: { nullable: true } },
		notEmpty: {
			errorMessage: 'Password should not be empty',
		},
		isString: {
			errorMessage: 'Password should be a string',
		},
		isLength: {
			options: {
				min: 6,
				max: 10,
			},
			errorMessage: 'Password should have 6 to 10 characters',
		},
	},
	phone: {
		optional: { options: { nullable: true } },
		isString: {
			errorMessage: 'Phone should be a string',
		},
	},
	services: {
		optional: { options: { nullable: true } },
		isArray: {
			errorMessage: 'Services should be an array of service IDs',
		},
	},
	availability: {
		optional: { options: { nullable: true } },
		isObject: {
			errorMessage:
				'Availability should be an object with days as keys and time slots as values',
		},
	},
};

export {
	createProviderValidator,
	loginProviderValidator,
	deleteProviderValidator,
	updateProviderValidator,
};
