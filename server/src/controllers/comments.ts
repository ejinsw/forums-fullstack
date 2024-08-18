import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { Comment, User } from "@prisma/client";
import prisma from "../config/client";

interface RequestBody {
  id: string;
  commentId: string;
}

export const getCommentById = expressAsyncHandler(
  async (
    req: Request<RequestBody, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let commentId: number | string = req.params.id;

      if (!commentId) {
        res.status(400).json({ message: "Id params undefined" });
        return;
      }

      commentId = parseInt(commentId, 10);
      if (isNaN(commentId)) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const comment = await prisma.comment.findUnique({
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

      const { content, postId } = req.body;

      let commentId: number | string = req.params.id;

      if (!commentId) {
        res.status(400).json({ message: "Id params undefined" });
        return;
      }

      commentId = parseInt(commentId, 10);
      if (isNaN(commentId)) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const newComment = await prisma.comment.create({
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

export const updateReply = expressAsyncHandler(
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

      let commentId: number | string = req.params.id;

      if (!commentId) {
        res.status(400).json({ message: "Id params undefined" });
        return;
      }

      commentId = parseInt(commentId, 10);
      if (isNaN(commentId)) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const newComment = await prisma.comment.findUnique({
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

      const updatedComment = await prisma.comment.update({
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
      } else {
        res
          .status(500)
          .json({ message: "Something went wrong, comment not updated" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export const deleteComment = expressAsyncHandler(
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

      let commentId: number | string = req.params.id;

      if (!commentId) {
        res.status(400).json({ message: "Id params undefined" });
        return;
      }

      commentId = parseInt(commentId, 10);
      if (isNaN(commentId)) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const existingComment = await prisma.comment.findUnique({
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
        await prisma.comment.delete({
          where: {
            id: commentId,
          },
        });

        res.status(200).json({ message: "Comment deleted successfully" });
        return;
      }

      const updatedComment = await prisma.comment.update({
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
      } else {
        res
          .status(500)
          .json({ message: "Something went wrong, comment not deleted" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export const getReplies = expressAsyncHandler(
  async (
    req: Request<RequestBody, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let commentId: number | string = req.params.id;

      if (!commentId) {
        res.status(400).json({ message: "Id params undefined" });
        return;
      }

      commentId = parseInt(commentId, 10);
      if (isNaN(commentId)) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const comment = await prisma.comment.findUnique({
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
      let commentId: number | string = req.params.id;
      const user = req.user as User;

      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      commentId = parseInt(commentId, 10);
      if (isNaN(commentId)) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const upvote = await prisma.upvote.findUnique({
        where: {
          userId_commentId: {
            commentId,
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
            commentId: commentId,
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
        let commentId: number | string = req.params.id;
        const user = req.user as User;
  
        if (!user) {
          res.status(401).json({ message: "Unauthorized" });
          return;
        }
  
        commentId = parseInt(commentId, 10);
        if (isNaN(commentId)) {
          res.status(400).json({ message: "Invalid id" });
          return;
        }
  
        const downvote = await prisma.downvote.findUnique({
          where: {
            userId_commentId: {
              commentId,
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
              commentId: commentId,
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
