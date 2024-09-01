import { prisma } from "../db/db.config.js";

const createComment = async (req, res) => {
  try {
    const { userId, postId, comment } = req.body;

    if (!userId || !postId || !comment) {
      res
        .status(400)
        .json({ success: false, message: "All felids are required" });
    }

    const newComment = await prisma.comment.create({
      data: {
        userId: Number(userId),
        postId: Number(postId),
        comment,
      },
    });

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: newComment,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getAllPostsComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(postId),
      },
    });

    res.status(200).json({
      success: true,
      message: "Comments successfully fetched ",
      data: comments,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
export { createComment, getAllPostsComments };
