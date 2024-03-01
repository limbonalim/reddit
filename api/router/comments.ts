import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import Comment from '../models/commentsSchema';
import auth, { RequestWithUser } from '../middleware/auth';

const commentsRouter = Router();

commentsRouter.post('/:id', auth, async (req: RequestWithUser, res, next) => {
	try {
		const user = req.user;
		let postId;

		try {
			postId = new Types.ObjectId(req.params.id as string);
		} catch {
			return res.status(404).send({ message: 'Wrong ObjectId!' });
		}

		const comment = new Comment({
			user: user?._id,
			post: postId,
			text: req.body.text,
		});

		await comment.save();
		res.status(201).send(comment);
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return res.status(422).send(e);
		}

		next(e);
	}
});

commentsRouter.get('/:id', async (req, res, next) => {
	try {
		let postId;

		try {
			postId = new Types.ObjectId(req.params.id as string);
		} catch {
			return res.status(404).send({ message: 'Wrong ObjectId!' });
		}
		const comments = await Comment.find({ post: postId }).populate(
			'user',
			'-_id, username',
		);

		if (!comments[0]) {
			return res.status(404).send({ message: 'Comments is not found' });
		}

		return res.send(comments);
	} catch (e) {
		next(e);
	}
});

export default commentsRouter;
