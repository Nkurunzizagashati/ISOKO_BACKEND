import express from 'express';
import { checkSchema } from 'express-validator';
import { multerUpload } from '../utils/multer.js';
import {
	loginProvider,
	registerProvider,
} from '../controllers/provider.js';
import {
	createProviderValidator,
	loginProviderValidator,
} from '../middlewares/providerValidator.js';

const router = express.Router();

const upload = multerUpload();

router.post(
	'/register',
	upload.single('profileImage'),
	checkSchema(createProviderValidator),
	registerProvider
);

router.post(
	'/login',
	checkSchema(loginProviderValidator),
	loginProvider
);

export default router;
