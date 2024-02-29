import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config';
import usersRouter from './router/users';
import postsRouter from './router/posts';
import commentsRouter from './router/comments';

const app = express();
const port = 8000;

app.use(json());
app.use(express.static('public'));
app.use(cors());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
	await mongoose.connect(config.mongoose);

	app.listen(port, () => {
		console.log(`Server started on ${port} port!`);
	});

	process.on('exit', () => {
		mongoose.disconnect();
	});
};

void run();
