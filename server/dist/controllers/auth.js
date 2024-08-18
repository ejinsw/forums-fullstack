"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = __importDefault(require("../config/client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.register = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { name, username, password, isAuthor } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        if (!name || !username || !password || !isAuthor) {
            res.status(500).json({ message: "Invalid request" });
            return;
        }
        const user = await client_1.default.user.findUnique({
            where: { username },
        });
        if (user) {
            res.status(400).json({ message: "Username already taken" });
        }
        else {
            const newUser = await client_1.default.user.create({
                data: {
                    name,
                    username,
                    password: hashedPassword,
                    creationDate: new Date(),
                    isAuthor: isAuthor,
                },
            });
            // Generate jwt
            const payload = {
                sub: newUser.id,
            };
            const token = await jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "secret", {
                expiresIn: "1h",
            });
            res.json(token);
        }
        // prisma.user.create();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err });
    }
});
exports.login = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await client_1.default.user.findUnique({ where: { username } });
        if (!user) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        }
        const payload = {
            sub: user.id,
        };
        const token = await jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "secret", {
            expiresIn: "1h",
        });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
