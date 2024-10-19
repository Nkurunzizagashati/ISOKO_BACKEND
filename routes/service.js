import express from 'express';
import { checkSchema } from 'express-validator';
import { createServiceValidator } from '../middlewares/serviceValidator.js';
import {
	createService,
	getAllServices,
} from '../controllers/service.js';
import { multerUpload } from '../utils/multer.js';

const router = express.Router();

const upload = multerUpload().array('images', 10);

router.post(
	'/',
	upload,
	checkSchema(createServiceValidator),
	createService
);
router.get('/', getAllServices);

export default router;
