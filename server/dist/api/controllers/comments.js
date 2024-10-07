"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleDownvote = exports.toggleUpvote = exports.getReplies = exports.deleteComment = exports.updateReply = exports.createReply = exports.getCommentById = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = __importDefault(require("../config/client"));
exports.getCommentById = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        let commentId = req.params.id;
        if (!commentId) {
            res.status(400).json({ message: "Id params undefined" });
            return;
        }
        commentId = parseInt(commentId, 10);
        if (isNaN(commentId)) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const comment = await client_1.default.comment.findUnique({
            where: {
                id: commentId,
            },
            include: {
                user: true,
                replies: true,
                upvotes: true,
                downvotes: true,
            },
        });
        if (!comment) {
            res.status(404).json({ message: "Comment doesn't exist" });
            return;
        }
        res.json(comment);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.createReply = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { content, postId } = req.body;
        let commentId = req.params.id;
        if (!commentId) {
            res.status(400).json({ message: "Id params undefined" });
            return;
        }
        commentId = parseInt(commentId, 10);
        if (isNaN(commentId)) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const newComment = await client_1.default.comment.create({
            data: {
                content,
                creationDate: new Date(),
                userId: user.id,
                parentId: commentId,
                postId
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
exports.updateReply = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { content } = req.body;
        let commentId = req.params.id;
        if (!commentId) {
            res.status(400).json({ message: "Id params undefined" });
            return;
        }
        commentId = parseInt(commentId, 10);
        if (isNaN(commentId)) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const newComment = await client_1.default.comment.findUnique({
            where: {
                id: commentId,
            },
            include: {
                user: true,
            },
        });
        if (!newComment) {
            res.status(404).json({ message: "Couldn't find comment" });
            return;
        }
        if (newComment?.userId !== user.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const updatedComment = await client_1.default.comment.update({
            where: {
                id: commentId,
            },
            data: {
                content,
            },
        });
        if (updatedComment) {
            res
                .status(200)
                .json({ message: "Comment updated successfully", updatedComment });
        }
        else {
            res
                .status(500)
                .json({ message: "Something went wrong, comment not updated" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteComment = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        let commentId = req.params.id;
        if (!commentId) {
            res.status(400).json({ message: "Id params undefined" });
            return;
        }
        commentId = parseInt(commentId, 10);
        if (isNaN(commentId)) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const existingComment = await client_1.default.comment.findUnique({
            where: {
                id: commentId,
            },
            include: {
                user: true,
                replies: true,
            },
        });
        if (!existingComment) {
            res.status(404).json({ message: "Couldn't find comment" });
            return;
        }
        if (existingComment?.userId !== user.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if (existingComment.replies && existingComment.replies.length === 0) {
            await client_1.default.comment.delete({
                where: {
                    id: commentId,
                },
            });
            res.status(200).json({ message: "Comment deleted successfully" });
            return;
        }
        const updatedComment = await client_1.default.comment.update({
            where: {
                id: commentId,
            },
            data: {
                isDeleted: true,
            },
        });
        if (updatedComment) {
            res
                .status(200)
                .json({ message: "Comment deleted successfully", updatedComment });
        }
        else {
            res
                .status(500)
                .json({ message: "Something went wrong, comment not deleted" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getReplies = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        let commentId = req.params.id;
        if (!commentId) {
            res.status(400).json({ message: "Id params undefined" });
            return;
        }
        commentId = parseInt(commentId, 10);
        if (isNaN(commentId)) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const comment = await client_1.default.comment.findUnique({
            where: {
                id: commentId,
            },
            include: {
                user: true,
                replies: {
                    include: {
                        user: true,
                        upvotes: true,
                        downvotes: true
                    },
                },
            },
        });
        if (!comment) {
            res.status(404).json({ message: "Comment doesn't exist" });
            return;
        }
        const replies = comment.replies;
        res.json(replies);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.toggleUpvote = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        let commentId = req.params.id;
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        commentId = parseInt(commentId, 10);
        if (isNaN(commentId)) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const upvote = await client_1.default.upvote.findUnique({
            where: {
                userId_commentId: {
                    commentId,
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
                    commentId: commentId,
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
        let commentId = req.params.id;
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        commentId = parseInt(commentId, 10);
        if (isNaN(commentId)) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const downvote = await client_1.default.downvote.findUnique({
            where: {
                userId_commentId: {
                    commentId,
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
                    commentId: commentId,
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
