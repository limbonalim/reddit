import { Router } from 'express';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import Post from '../models/postsSchema';
import { imagesUpload } from '../multer';

const postsRouter = Router();

postsRouter.post(
	'/',
	auth,
	imagesUpload.single('image'),
	async (req: RequestWithUser, res, next) => {
		try {
			const user = req.user;

			const post = new Post({
				title: req.body.title,
				description: req.body.description,
				image: req.file ? `images/${req.file.filename}` : undefined,
				author: user?._id,
			});

			await post.save();
			res.status(201).send(post);
		} catch (e) {
			if (e instanceof mongoose.Error.ValidationError) {
				return res.status(422).send(e);
			}

			next(e);
		}
	},
);

postsRouter.get('/', async (req, res, next) => {
	try {
		const headerValue = req.get('Authorization');
		const [_bearer, token] = headerValue ? headerValue.split(' ') : '';
		let posts;

		if (!token) {
			posts = await Post.find().select('-description');
		} else {
			posts = await Post.find();
		}

		if (!posts[0]) {
			return res.status(404).send({ message: 'Not found!' });
		}
		return res.send(posts);
	} catch (e) {
		next(e);
	}
});

export default postsRouter;
