import { Router } from 'express';
import blogsRouter from './blogs';
import tagsRouter from './blogtags';
import commentsRouter from './comments';
import authorsRouter from './authors';

const router = Router();

router.use('/blogs', blogsRouter);
router.use('/blogtags', tagsRouter);
router.use('/comments', commentsRouter);
router.use('/authors', authorsRouter);

export default router;