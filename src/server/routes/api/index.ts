import { Router } from 'express';
import blogsRouter from './blogs';
import tagsRouter from './blogtags';
import commentsRouter from './comments';
import authorsRouter from './authors';
import donateRouter from './donate';
import contactRouter from './contact';

const router = Router();

router.use('/blogs', blogsRouter);
router.use('/blogtags', tagsRouter);
router.use('/comments', commentsRouter);
router.use('/authors', authorsRouter);
router.use('/donate', donateRouter);
router.use('/contact', contactRouter);

export default router;