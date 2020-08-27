import { Router } from 'express';
import { charge } from  '../../utils/stripe';

const router = Router();

router.post('/', async (req, res) => {
    const chargeDTO = req.body;
	try {
		const result = await charge(chargeDTO.token.id, chargeDTO.amount);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
});

export default router;