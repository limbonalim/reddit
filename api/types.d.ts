import { Model, Schema } from 'mongoose';

export interface IUserFields {
	username: string;
	password: string;
	token: string;
}

export interface IUserMethods {
	checkPassword(password: string): Promise<boolean>;
	generateToken(): void;
}

export type IUserModel = Model<IUserFields, unknown, IUserMethods>;

export interface IPostFields {
	title: string;
	description?: string;
	image?: string;
	createdAt: Date;
	author: Schema.Types.ObjectId;
}

export type IPostModel = Model<IPostFields, unknown, unknown>;
