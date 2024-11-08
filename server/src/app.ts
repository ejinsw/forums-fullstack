import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import passport from "./config/passport";
import serverless from "serverless-http";

import authRoutes from "./routes/auth";
import postsRoutes from "./routes/posts";
import usersRoutes from "./routes/users";
import commentsRoutes from "./routes/comments";

dotenv.config();

const app: Application = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/comments", commentsRoutes);

// Token validator
app.get(
  "/api/validate-token",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ user: req.user, valid: true });
  }
);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

// FOR SERVER
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// export default app;

// FOR SERVERLESS
export const handler = serverless(app);
