import { Router } from 'express';
import * as passport from 'passport';
import type { ReqUser } from '../../utils/types';
import db from '../../db';

const router = Router();

router.get('/profile', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    const author_id = req.user.id;
    try {
        const blogs = await db.blogs.writtenBy(author_id);
        res.json({ profile: { ...req.user }, blogs });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
});

export default router;