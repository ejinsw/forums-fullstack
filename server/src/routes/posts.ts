import { Router } from "express";
import {
  createComment,
  createPost,
  getAllComments,
  getAllPosts,
  getPostById,
  toggleDownvote,
  toggleUpvote,
} from "../controllers/posts";
import { authenticate } from "../config/passport";

const router = Router();

router.get("/", getAllPosts);
router.post("/", authenticate, createPost);
router.get("/:id", getPostById);

router.get("/:id/comments", getAllComments);
router.post("/:id/comments", authenticate, createComment);

router.post("/:id/upvote", authenticate, toggleUpvote);
router.post("/:id/downvote", authenticate, toggleDownvote);


export default router;
