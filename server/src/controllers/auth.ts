import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import prisma from "../config/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Interfaces
interface RegisterRequestBody {
  name: string;
  username: string;
  password: string;
  isAuthor: boolean;
}

export const register = expressAsyncHandler(
  async (
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, username, password, isAuthor } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      if (!name || !username || !password || !isAuthor) {
        res.status(500).json({ message: "Invalid request" });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (user) {
        res.status(400).json({ message: "Username already taken" });
      } else {
        const newUser = await prisma.user.create({
          data: {
            name,
            username,
            password: hashedPassword,
            creationDate: new Date(),
            isAuthor: isAuthor,
          },
        });

        // Generate jwt
        const payload = { sub: newUser.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
          expiresIn: "1h",
        });

        res.json(token);
      }

      // prisma.user.create();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error", error: err });
    }
  }
);

export const login = expressAsyncHandler(
  async (
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { username } });

      if (!user) {
        res.status(401).json({ message: "Invalid username or password" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(401).json({ message: "Invalid username or password" });
        return;
      }

      const payload = { sub: user.id };

      const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);
