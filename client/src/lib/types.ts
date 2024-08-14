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
	upvotes: Upvote[];
	downvotes: Downvote[];
}

export interface Comment {
	id: number;
	content: string;
	creationDate: string;
	user: User;
	replies: Comment[];
	userId: number;
	postId: number;
	isDeleted: boolean;
	upvotes: Upvote[];
	downvotes: Downvote[];
}

export interface Upvote {
	id: number;
	userId: number;
	commentId?: number;
	postId?: number;
	user: User;
	post?: Post;
	comment?: Comment;
}

export interface Downvote {
	id: number;
	userId: number;
	commentId?: number;
	postId?: number;
	user: User;
	post?: Post;
	comment?: Comment;
}
