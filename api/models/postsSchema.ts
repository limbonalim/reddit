import { Schema, model, HydratedDocument } from 'mongoose';
import User from './usersSchema';
import type { IPostFields, IPostModel } from '../types';

const postsSchema = new Schema<IPostFields, IPostModel, unknown>({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: function (this: HydratedDocument<IPostFields>) {
			return !this.image;
		},
	},
	image: {
		type: String,
		required: function (this: HydratedDocument<IPostFields>) {
			return !this.description;
		},
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
	author: {
		type: Schema.Types.ObjectId,
		required: true,
		validate: {
			validator: async (userId: Schema.Types.ObjectId) => {
				const user = await User.findById(userId);
				return Boolean(user);
			},
			message: 'User is not found!',
		},
	},
});

const Post = model<IPostFields, IPostModel>('posts', postsSchema);

export default Post;
