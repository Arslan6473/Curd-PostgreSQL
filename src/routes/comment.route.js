import { Router } from "express";
import { createComment, getAllPostsComments } from "../controllers/comment.controller.js";

const router = Router();

router.route("/create").post(createComment);
router.route("/:postId").get(getAllPostsComments);


export default router;