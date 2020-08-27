import { Router } from 'express';
import { sendEmail } from  '../../utils/mailgun';

const router = Router();

router.post('/', async (req, res) => {
    const emailDTO = req.body;
	try {
		const result = await sendEmail('NSquale212@gmail.com', emailDTO.email, emailDTO.subject, emailDTO.message);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
});

export default router;