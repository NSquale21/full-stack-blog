import * as passport from 'passport';
import { Router } from 'express';
import { createToken } from '../../utils/tokens';
import type { ReqUser } from '../../utils/types';
import db from '../../db';

const router = Router();

router.get('/check', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    res.sendStatus(200);
});

router.delete('/invalidate', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const author_id = req.user.id;
        const results = await db.tokens.destroy(token, author_id);
        res.json(results);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
});

export default router;