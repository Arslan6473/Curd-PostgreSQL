import { Router } from "express";
import { createPost, deletePost, getAllPosts, getSinglePost, likeOrUnlikePost, searchPost } from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(createPost);
router.route("/").get(getAllPosts);
router.route("/:id").get(getSinglePost);
router.route("/delete/:id").delete(deletePost);
router.route("/like/:id").post(likeOrUnlikePost);
router.route("/search").post(searchPost);



export default router;
