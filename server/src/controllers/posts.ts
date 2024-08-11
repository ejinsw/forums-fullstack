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
        },
      });

      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
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

      const postId = parseInt(id, 10);
      if (isNaN(postId)) {
        res.status(400).json({ message: "Invalid post ID" });
        return;
      }

      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
          },
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

      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          published,
          creationDate: new Date(),
          userId: user.id,
        },
      });

      if (newPost) {
        res.status(201).json({ message: "Created post sucessfully" });
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

      const postId = parseInt(id, 10);
      if (isNaN(postId)) {
        res.status(400).json({ message: "Invalid post ID" });
        return;
      }

      const comments = await prisma.comment.findMany({
        where: {
          postId: postId,
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

export const getCommentById = expressAsyncHandler(
  async (
    req: Request<RequestBody, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let postId: number | string = req.params.id;
      let commentId: number | string = req.params.commentId;

      if (!postId || !commentId) {
        res.status(400).json({ message: "Id params undefined" });
        return;
      }

      postId = parseInt(postId, 10);
      commentId = parseInt(commentId, 10);
      if (isNaN(postId) || isNaN(commentId)) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const comment = await prisma.comment.findUnique({
        where: {
          id: commentId,
          postId,
        },
        include: {
          user: true,
        },
      });

      if (!comment) {
        res.status(404).json({ message: "Comment doesn't exist" });
        return;
      }

      res.json(comment);
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
      let postId: number | string = req.params.id;

      if (!postId) {
        res.status(400).json({ message: "Id params undefined" });
        return;
      }

      postId = parseInt(postId, 10);
      if (isNaN(postId)) {
        res.status(400).json({ message: "Invalid id" });
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

export const createReply = expressAsyncHandler(
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

      const { content, parentId } = req.body;
      let postId: number | string = req.params.id;

      if (!postId) {
        res.status(400).json({ message: "Id params undefined" });
        return;
      }

      postId = parseInt(postId, 10);
      if (isNaN(postId)) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const newComment = await prisma.comment.create({
        data: {
          content,
          creationDate: new Date(),
          userId: user.id,
          parentId
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
