import { prisma } from "../db/db.config.js";

const createPost = async (req, res) => {
  try {
    const { userId, title, description } = req.body;

    if (!userId || !title || !description) {
      res
        .status(400)
        .json({ success: false, message: "All felids are required" });
    }

    const post = await prisma.post.create({
      data: {
        userId: Number(userId),
        title,
        description,
      },
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.perPage) || 10;
    if (page <= 0) {
      page = 1;
    }
    if (limit >= 100) {
      limit = 10;
    }
    const skip = (page - 1) * limit;
    const posts = await prisma.post.findMany({
      skip: skip,
      take: limit,
      include: {
        comments: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const totalPosts = await prisma.post.count()
    const totalPages = Math.ceil(totalPosts/limit)

    res.status(200).json({
      success: true,
      message: "Posts successfully fetched ",
      data: posts,
      meta:{
        totalPages,
        page,
        limit
      }
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        comments: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Post successfully fetched",
      data: post,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Post successfully deleted",
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const likeOrUnlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    if (response) {
      const updatedPost = await prisma.post.update({
        where: {
          id: Number(id),
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });

      res.status(200).json({
        success: true,
        message: "Like added to post",
        data: updatedPost,
      });
    } else {
      const updatedPost = await prisma.post.update({
        where: {
          id: Number(id),
        },
        data: {
          likes: {
            decrement: 1,
          },
        },
      });

      res.status(200).json({
        success: true,
        message: "Like remove from post",
        data: updatedPost,
      });
    }
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const searchPost = async (req, res) => {
  try {
    const query = req.query.q;
    console.log(query);
    const posts = await prisma.post.findMany({
      where: {
        description: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Posts successfully fetched",
      data: posts,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  likeOrUnlikePost,
  searchPost,
};
