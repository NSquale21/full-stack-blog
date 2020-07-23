import { Router } from 'express';
import loginRouter from './login';
import tokensRouter from './tokens';

const router = Router();

router.use('/login', loginRouter);
router.use('/tokens', tokensRouter);

export default router;