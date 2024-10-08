"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("../config/passport");
const comments_1 = require("../controllers/comments");
const router = (0, express_1.Router)();
router.get("/:id", comments_1.getCommentById);
router.post("/:id", passport_1.authenticate, comments_1.createReply);
router.put("/:id", passport_1.authenticate, comments_1.updateReply);
router.delete("/:id", passport_1.authenticate, comments_1.deleteComment);
router.get("/:id/replies", comments_1.getReplies);
router.post("/:id/upvote", passport_1.authenticate, comments_1.toggleUpvote);
router.post("/:id/downvote", passport_1.authenticate, comments_1.toggleDownvote);
exports.default = router;
