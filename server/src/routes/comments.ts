import { Router } from "express";
import { authenticate } from "../config/passport";
import { createReply, deleteComment, getCommentById, getReplies, updateReply } from "../controllers/comments";

const router = Router();

router.get("/:id", getCommentById);
router.post("/:id", authenticate, createReply);
router.put("/:id", authenticate, updateReply);
router.delete("/:id", authenticate, deleteComment);
router.get("/:id/replies", getReplies);

export default router;