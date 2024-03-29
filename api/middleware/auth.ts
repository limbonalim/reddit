import type { Request, Response, NextFunction } from 'express';
import type { HydratedDocument } from 'mongoose';
import User from '../models/usersSchema';
import type { IUserFields } from '../types';

export interface RequestWithUser extends Request {
	user?: HydratedDocument<IUserFields>;
}

const auth = async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction,
) => {
	const headerValue = req.get('Authorization');

	const [_bearer, token] = headerValue ? headerValue.split(' ') : '';

	if (!token) {
		return res.status(401).send({ error: 'No token present' });
	}
	const user = await User.findOne({ token });

	if (!user) {
		return res.status(401).send({ error: 'Wrong token' });
	}

	req.user = user;
	next();
};

export default auth;
