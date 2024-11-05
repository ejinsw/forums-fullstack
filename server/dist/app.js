"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("./config/passport"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const auth_1 = __importDefault(require("./routes/auth"));
const posts_1 = __importDefault(require("./routes/posts"));
const users_1 = __importDefault(require("./routes/users"));
const comments_1 = __importDefault(require("./routes/comments"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(passport_1.default.initialize());
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/posts", posts_1.default);
app.use("/api/users", users_1.default);
app.use("/api/comments", comments_1.default);
// Token validator
app.get("/api/validate-token", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ user: req.user, valid: true });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.get("/hello", (req, res) => {
    res.json({ message: "Hello World!" });
});
// FOR SERVER
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// export default app;
// FOR SERVERLESS
exports.handler = (0, serverless_http_1.default)(app);
