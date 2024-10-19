import multer from 'multer';

const multerUpload = () => {
	// Set up multer storage
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads/');
		},
		filename: (req, file, cb) => {
			const uniqueSuffix =
				Date.now() + '-' + Math.round(Math.random() * 1e9);
			cb(null, uniqueSuffix + '-' + file.originalname);
		},
	});

	const upload = multer({ storage });

	return upload;
};

export { multerUpload };
