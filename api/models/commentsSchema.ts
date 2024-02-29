import { Schema, model } from 'mongoose';
import User from './usersSchema';
import Post from './postsSchema';
import { ICommentFields, ICommentModel } from '../types';

const commentsSchema = new Schema<ICommentFields, ICommentModel, unknown>({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		validate: {
			validator: async (userId: Schema.Types.ObjectId) => {
				const user = await User.findById(userId);
				return Boolean(user);
			},
			message: 'User is not found',
		},
	},
	post: {
		type: Schema.Types.ObjectId,
		required: true,
		validate: {
			validator: async (postId: Schema.Types.ObjectId) => {
				const post = await Post.findById(postId);
				return Boolean(post);
			},
			message: 'Post is not found',
		},
	},
	text: {
		type: String,
		required: true,
	},
});

const Comment = model<ICommentFields, ICommentModel>(
	'comments',
	commentsSchema,
);

export default Comment;
