// get endpoint that needs to have 
// get; /blogid   send query as response

import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (req, res) => {
	try {
		const tags = await db.blogtags.getTags();
		res.json(tags);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
})

router.get('/filter/:id', async (req, res) => {
	const id = Number(req.params.id);
	try {
		const tags = await db.blogtags.filterTags(id);
		res.json(tags);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
})

export default router;