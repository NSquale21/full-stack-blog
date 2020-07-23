import { Router } from 'express';
import * as passport from 'passport';
import type { ReqUser } from '../../utils/types';
import db from '../../db';

const router = Router();

router.get('/', async (req, res) => {
	try {
		const blogs = await db.blogs.all();
		res.json(blogs);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
});

router.get('/:blogid', async (req, res) => {
	const blogid = Number(req.params.blogid);
	try {
		const [blog] = await db.blogs.one(blogid);
		const [blogtags] = await db.blogtags.getOneBlogTag(blogid);
		res.json([blog, blogtags]);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
});

router.post('/', passport.authenticate('jwt'), async (req: ReqUser, res) => {
	const blogDTO = req.body;
	const author_id = req.user.id;
	try {
		const result = await db.blogs.insert(blogDTO.title, blogDTO.content, blogDTO.image_url, author_id);
		if (Number(req.body.tag_id)) {
			const tagsResult = await db.blogtags.insertBlogTags(result.insertId, req.body.tag_id);
		}
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
});

router.put('/:blogid', passport.authenticate('jwt'), async (req: ReqUser, res) => {
	const blogDTO = req.body;
	const tagID = req.body.tag_id;
	const blogid = Number(req.params.blogid);
	const author_id = req.user.id;
	try {
		const result = await db.blogs.update(blogDTO.title, blogDTO.content, blogDTO.image_url, blogid, author_id);
		if (tagID) {
			console.log(tagID, blogid);
			const tagsResult = await db.blogtags.updateBlogTags(blogid, tagID);
			console.log(tagsResult);
		}
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
});

router.delete('/:blogid', passport.authenticate('jwt'), async (req: ReqUser, res) => {
	const blogid = Number(req.params.blogid);
	const author_id = req.user.id;
	try {
		const result = await db.blogs.destroy(blogid, author_id);
		res.json({ msg: `Blog ${blogid} Deleted!`, result});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh Oh!'});
	}
});

export default router;