import { Router } from 'express';
import apiRouter from './api';
import authRouter from './auth';
import config from '../config';

const router = Router();

router.use(config.app.prefix, apiRouter);
router.use('/auth', authRouter);

export default router;