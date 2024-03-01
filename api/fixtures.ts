import mongoose from 'mongoose';
import config from './config';
import User from './models/usersSchema';
import Post from './models/postsSchema';
import Comment from './models/commentsSchema';

const dropCollection = async (
	db: mongoose.Connection,
	collectionName: string,
) => {
	try {
		await db.dropCollection(collectionName);
	} catch (e) {
		console.log(`Collection ${collectionName} was missing, skipping drop`);
	}
};

const run = async () => {
	await mongoose.connect(config.mongoose);
	const db = mongoose.connection;

	const models = [User, Post, Comment];

	for (const model of models) {
		await dropCollection(db, model.collection.collectionName);
	}
	const [user, userTwo] = await User.create(
		{
			username: 'user',
			password: '112323',
			token: crypto.randomUUID(),
		},
		{
			username: 'user2',
			password: 'password',
			token: crypto.randomUUID(),
		},
	);

	const [postOne, postTwo, postThree, postFour] = await Post.create(
		{
			title: 'Some One Post',
			description: 'some description text...',
			image: 'fixtures/photo.jpg',
			author: user,
		},
		{
			title: 'Some Two Post',
			description: 'Some text for two post...',
			author: user,
		},
		{
			title: 'Some Three Post',
			image: 'fixtures/photoTwo.png',
			author: userTwo,
		},
		{
			title: 'Some Four Post',
			description: 'some description text...',
			author: userTwo,
		},
	);

	await Comment.create(
		{
			post: postOne,
			user: userTwo,
			text: 'some comment...',
		},
		{
			post: postOne,
			user: user,
			text: 'my text...',
		},
		{
			post: postFour,
			user: userTwo,
			text: 'Some text - ....',
		},
		{
			post: postTwo,
			user: user,
			text: 'Some text - ....',
		},
		{
			post: postThree,
			user: userTwo,
			text: 'Some text - ....',
		},
	);

	await db.close();
};

void run();
