import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import prisma from "../config/client";
import { User } from "@prisma/client";

// Interfaces
interface RequestBody {
  id: string;
}

export const getAllUsers = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Getting all users...")
      const users = await prisma.user.findMany({
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

      console.log("Sending all users...")
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export const getUserById = expressAsyncHandler(
  async (
    req: Request<RequestBody, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;

      if (!id) {
        res.status(400).json({ message: "Id params undefined" });
        return;
      }

      const user = await prisma.user.findUnique({
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
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);
