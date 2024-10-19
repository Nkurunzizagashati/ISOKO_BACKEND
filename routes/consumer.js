import express from 'express';
import { checkSchema } from 'express-validator';
import {
	getAllConsumers,
	loginConsumer,
	registerConsumer,
} from '../controllers/consumer.js';
import {
	createConsumerValidator,
	loginConsumerValidator,
} from '../middlewares/consumerValidator.js';
import { multerUpload } from '../utils/multer.js';

const router = express.Router();

const upload = multerUpload();

router.post(
	'/register',
	upload.single('profileImage'),
	checkSchema(createConsumerValidator),
	registerConsumer
);

router.post(
	'/login',
	checkSchema(loginConsumerValidator),
	loginConsumer
);

export default router;
