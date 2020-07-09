import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/count/:id', async (req, res) => {
	const id = Number(req.params.id);
	try {
		const [comments] = await db.comments.commentCount(id);
		res.json(comments);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
});

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

router.post('/', async (req, res) => {
	const commentDTO = req.body;
	try {
		const result = await db.comments.insertComment(commentDTO.content, commentDTO.blog_id, commentDTO.author_id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
});

router.put('/:id', async(req, res) => {
	const id = Number(req.params.id);
	const commentDTO = req.body;
	try {
		const result = await db.comments.updateComment(commentDTO.content, id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
});

router.delete('/:id', async (req, res) => {
	const id = Number(req.params.id);
	try {
		const result = await db.comments.destroyComment(id);
		res.json({ msg: `Comment ${id} Deleted!`, result});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh Oh!'});
	}
});

export default router;
