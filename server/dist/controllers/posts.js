"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleDownvote = exports.toggleUpvote = exports.createComment = exports.getAllComments = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = __importDefault(require("../config/client"));
exports.getAllPosts = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const posts = await client_1.default.post.findMany({
            include: {
                user: true,
                comments: true,
                upvotes: true,
                downvotes: true
            },
        });
        res.json(posts);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getPostById = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ message: "Id params undefined" });
            return;
        }
        const postId = parseInt(id, 10);
        if (isNaN(postId)) {
            res.status(400).json({ message: "Invalid post ID" });
            return;
        }
        const post = await client_1.default.post.findUnique({
            where: { id: postId },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true,
                        upvotes: true,
                        downvotes: true,
                    },
                },
                upvotes: true,
                downvotes: true
            },
        });
        if (!post) {
            res.status(404).json({ message: "Post doesn't exist" });
            return;
        }
        res.json(post);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.createPost = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const user = req.user;
        const { title, content, published } = req.body;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        let confirmPublished = published ? published : true;
        const newPost = await client_1.default.post.create({
            data: {
                title,
                content,
                published: confirmPublished,
                creationDate: new Date(),
                userId: user.id,
            },
        });
        if (newPost) {
            res.status(201).json({ message: "Created post sucessfully", post: newPost });
        }
        else {
            res
                .status(500)
                .json({ message: "Something went wrong, post not created" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getAllComments = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ message: "Id params undefined" });
            return;
        }
        const postId = parseInt(id, 10);
        if (isNaN(postId)) {
            res.status(400).json({ message: "Invalid post ID" });
            return;
        }
        const comments = await client_1.default.comment.findMany({
            where: {
                postId: postId,
            },
            include: {
                user: true,
            },
        });
        res.json(comments);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.createComment = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { content } = req.body;
        let postId = req.params.id;
        if (!postId) {
            res.status(400).json({ message: "Id params undefined" });
            return;
        }
        postId = parseInt(postId, 10);
        if (isNaN(postId)) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const newComment = await client_1.default.comment.create({
            data: {
                content,
                creationDate: new Date(),
                userId: user.id,
                postId: postId,
            },
        });
        if (newComment) {
            res.status(201).json({ message: "Created comment sucessfully" });
        }
        else {
            res
                .status(500)
                .json({ message: "Something went wrong, comment not created" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.toggleUpvote = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        let postId = req.params.id;
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        postId = parseInt(postId, 10);
        if (isNaN(postId)) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const upvote = await client_1.default.upvote.findUnique({
            where: {
                userId_postId: {
                    postId,
                    userId: user.id,
                },
            },
        });
        if (upvote) {
            await client_1.default.upvote.delete({
                where: {
                    id: upvote.id,
                },
            });
            res.json({ message: "Upvote removed" });
        }
        else {
            // Upvote doesn't exist, so add it
            await client_1.default.upvote.create({
                data: {
                    userId: user.id,
                    postId: postId,
                },
            });
            res.json({ message: "Upvote added" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.toggleDownvote = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        let postId = req.params.id;
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        postId = parseInt(postId, 10);
        if (isNaN(postId)) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const downvote = await client_1.default.downvote.findUnique({
            where: {
                userId_postId: {
                    postId,
                    userId: user.id,
                },
            },
        });
        if (downvote) {
            await client_1.default.downvote.delete({
                where: {
                    id: downvote.id,
                },
            });
            res.json({ message: "Downvote removed" });
        }
        else {
            // Downvote doesn't exist, so add it
            await client_1.default.downvote.create({
                data: {
                    userId: user.id,
                    postId: postId,
                },
            });
            res.json({ message: "Downvote added" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
