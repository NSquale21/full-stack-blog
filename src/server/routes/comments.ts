import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
		const comments = await db.comments.forBlog(id);
		res.json(comments);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
});

export default router;