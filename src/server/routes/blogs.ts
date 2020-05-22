import { Router } from 'express';
import db from '../db';

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

router.post('/', async (req, res) => {
	const blogDTO = req.body;
	try {
		const result = await db.blogs.insert(blogDTO.title, blogDTO.content, blogDTO.image_url, blogDTO.author_id);
		if (req.body.tag_id) {
			const tagsResult = await db.blogtags.insertBlogTags(result.insertId, req.body.tag_id);
		}
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh!' });
	}
});

router.put('/:blogid', async (req, res) => {
	const blogDTO = req.body;
	const tagID = req.body.tag_id;
	const blogid = Number(req.params.blogid);
	try {
		const result = await db.blogs.update(blogDTO.title, blogDTO.content, blogDTO.image_url, blogid);
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

router.delete('/:blogid', async (req, res) => {
	const blogid = Number(req.params.blogid);
	try {
		const result = await db.blogs.destroy(blogid);
		res.json({ msg: `Blog ${blogid} Deleted!`, result});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh Oh!'});
	}
});

export default router;