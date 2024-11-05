export interface User {
	id: string;
	username: string;
	password: string;
	name: string;
	creationDate: Date;
	isAuthor: boolean | null;
	posts: Post[];
	comments: Comment[];
}

export interface Post {
	id: string;
	title: string;
	content: string;
	published: boolean;
	creationDate: string;
	userId: string;
	user: User;
	comments: Comment[];
	upvotes: Upvote[];
	downvotes: Downvote[];
}

export interface Comment {
	id: string;
	content: string;
	creationDate: string;
	user: User;
	replies: Comment[];
	userId: string;
	postId: string;
	post: Post
	isDeleted: boolean;
	upvotes: Upvote[];
	downvotes: Downvote[];
	parent?: Comment
	parentId?: string
}

export interface Upvote {
	id: string;
	userId: string;
	commentId?: string;
	postId?: string;
	user: User;
	post?: Post;
	comment?: Comment;
}

export interface Downvote {
	id: string;
	userId: string;
	commentId?: string;
	postId?: string;
	user: User;
	post?: Post;
	comment?: Comment;
}
