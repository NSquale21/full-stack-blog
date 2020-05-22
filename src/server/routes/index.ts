import { Router } from 'express';
import blogsRouter from './blogs';
import tagsRouter from './blogtags';

const router = Router();

router.use('/blogs', blogsRouter);
router.use('/blogtags', tagsRouter);

export default router;