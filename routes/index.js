import express from 'express';
import consumerRouter from './consumer.js';
import providerRouter from './provider.js';
import serviceRouter from './service.js';
import reviewRouter from './review.js';

const router = express.Router();

router.use('/consumers', consumerRouter);
router.use('/providers', providerRouter);
router.use('/services', serviceRouter);
router.use('/reviews', reviewRouter);

export default router;
