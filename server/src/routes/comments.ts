import { Router } from "express";
import { authenticate } from "../config/passport";
import { createReply, deleteComment, getCommentById, getReplies, updateReply, toggleUpvote, toggleDownvote } from "../controllers/comments";

const router = Router();

router.get("/:id", getCommentById);
router.post("/:id", authenticate, createReply);
router.put("/:id", authenticate, updateReply);
router.delete("/:id", authenticate, deleteComment);

router.get("/:id/replies", getReplies);

router.post("/:id/upvote", authenticate, toggleUpvote);
router.post("/:id/downvote", authenticate, toggleDownvote);

export default router;