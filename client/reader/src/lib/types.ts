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
	content: string;
	creationDate: Date;
	userId: number;
	postId: number;
}
