import { Router } from 'express';
import { createToken } from '../../utils/tokens';
import { generateHash } from '../../utils/passwords';
import db from '../../db';

const router = Router();

router.post('/', async (req, res) => {
    const userDTO = req.body;
    userDTO.password = generateHash(userDTO.password);
    try {
        const results = await db.authors.insert(userDTO);
        const token = await createToken({ author_id: results.insertId })
        res.json(token);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
});

export default router;