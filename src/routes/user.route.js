import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/create").post(createUser);
router.route("/update/:id").put(updateUser);
router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser);
router.route("/delete/:id").delete(deleteUser);


export default router;
