import { prisma } from "../db/db.config.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res
        .status(400)
        .json({ success: false, message: "All felids are required" });
    }
    //check if user already exist
    const existedUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existedUser) {
      res.status(400).json({
        success: false,
        message: "User already register on this email ",
      });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!name || email) {
      res
        .status(400)
        .json({ success: false, message: "One felid is required" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
      },
    });

    res.status(200).json({
      success: false,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});


    res.status(200).json({
      success: true,
      message: "Users successfully fetched ",
      data: users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
      include:{
        posts:true,
        _count:{
          select:{
          posts:true,
          comments:true
          }
        }
      },
    });


    res.status(200).json({
      success: true,
      message: "User successfully fetched",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "User successfully deleted",
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export { createUser, updateUser, getAllUsers, getSingleUser, deleteUser };
