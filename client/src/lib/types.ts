export interface User {
	id: number;
	username: string;
	password: string;
	name: string;
	creationDate: Date;
	isAuthor: boolean | null;
	posts: Post[];
	comments: Comment[];
}

export interface Post {
	id: number;
	title: string;
	content: string;
	published: boolean;
	creationDate: string;
	userId: number;
	user: User;
	comments: Comment[];
}

export interface Comment {
	id: number;
	content: string;
	creationDate: string;
	user: User
	replies: Comment[];
	userId: number;
	postId: number;
	isDeleted: boolean;
}
