import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import prisma from "../config/client";
import { Comment, Post, User } from "@prisma/client";

// Interfaces
interface RequestBody {
  id: string;
  commentId: string;
}

export const getAllPosts = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
          upvotes: true,
          downvotes: true
        },
      });

      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  }
);

export const getPostById = expressAsyncHandler(
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

      const post = await prisma.post.findUnique({
        where: { id: id },
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
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export const createPost = expressAsyncHandler(
  async (req: Request<{}, {}, Post>, res: Response, next: NextFunction) => {
    try {
      const user = req.user as User;
      const { title, content, published } = req.body;

      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      let confirmPublished = published ? published : true;

      const newPost = await prisma.post.create({
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
      } else {
        res
          .status(500)
          .json({ message: "Something went wrong, post not created" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export const getAllComments = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      if (!id) {
        res.status(400).json({ message: "Id params undefined" });
        return;
      }

      const comments = await prisma.comment.findMany({
        where: {
          postId: id,
        },
        include: {
          user: true,
        },
      });

      res.json(comments);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export const createComment = expressAsyncHandler(
  async (
    req: Request<RequestBody, {}, Comment>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user as User;
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { content } = req.body;
      let postId: string = req.params.id;

      if (!postId) {
        res.status(400).json({ message: "Id params undefined" });
        return;
      }

      const newComment = await prisma.comment.create({
        data: {
          content,
          creationDate: new Date(),
          userId: user.id,
          postId: postId,
        },
      });

      if (newComment) {
        res.status(201).json({ message: "Created comment sucessfully" });
      } else {
        res
          .status(500)
          .json({ message: "Something went wrong, comment not created" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export const toggleUpvote = expressAsyncHandler(
  async (
    req: Request<RequestBody, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let postId: string = req.params.id;
      const user = req.user as User;

      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const upvote = await prisma.upvote.findUnique({
        where: {
          userId_postId: {
            postId: postId,
            userId: user.id,
          },
        },
      });

      if (upvote) {
        await prisma.upvote.delete({
          where: {
            id: upvote.id,
          },
        });
        res.json({ message: "Upvote removed" });
      } else {
        // Upvote doesn't exist, so add it
        await prisma.upvote.create({
          data: {
            userId: user.id,
            postId: postId,
          },
        });
        res.json({ message: "Upvote added" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export const toggleDownvote = expressAsyncHandler(
  async (
    req: Request<RequestBody, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let postId: string = req.params.id;
      const user = req.user as User;

      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const downvote = await prisma.downvote.findUnique({
        where: {
          userId_postId: {
            postId: postId,
            userId: user.id,
          },
        },
      });

      if (downvote) {
        await prisma.downvote.delete({
          where: {
            id: downvote.id,
          },
        });
        res.json({ message: "Downvote removed" });
      } else {
        // Downvote doesn't exist, so add it
        await prisma.downvote.create({
          data: {
            userId: user.id,
            postId: postId,
          },
        });
        res.json({ message: "Downvote added" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
