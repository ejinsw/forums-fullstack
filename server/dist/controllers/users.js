"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = __importDefault(require("../config/client"));
exports.getAllUsers = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        console.log("Getting all users...");
        const users = await client_1.default.user.findMany({
            take: 20,
            include: {
                posts: {
                    include: {
                        comments: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
                comments: true,
            },
        });
        console.log("Sending all users...");
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getUserById = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ message: "Id params undefined" });
            return;
        }
        const user = await client_1.default.user.findUnique({
            where: { id: id },
            include: {
                posts: {
                    include: {
                        comments: {
                            include: {
                                user: true,
                            },
                        },
                        user: true,
                    },
                },
                comments: {
                    include: {
                        user: true,
                        upvotes: true,
                        downvotes: true,
                        post: {
                            include: {
                                user: true,
                            },
                        },
                        parent: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });
        if (!user) {
            res.status(404).json({ message: "User doesn't exist" });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
