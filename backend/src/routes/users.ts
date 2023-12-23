import { Router } from "express";
import { prisma } from "../db.js";

const usersRouter = Router();

// Create new user
usersRouter.post("/users", async (req, res, next) => {
  const { userId, email, username, avatarUrl } = req.body;

  if (
    !userId ||
    userId !== "string" ||
    !email ||
    email !== "string" ||
    (username && username !== "string") ||
    (avatarUrl && avatarUrl !== "string")
  ) {
    return res.status(400).json("Invalid user data");
  }
  try {
    const user = await prisma.user.create({
      data: {
        id: userId,
        email,
        username,
        avatarUrl,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});
