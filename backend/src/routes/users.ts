import { Router } from "express";
import { prisma } from "../db.js";

const usersRouter = Router();

// Create new user
usersRouter.post("/users", async (req, res, next) => {
  const { userId, email, username } = req.body;
  console.log(req.body);

  if (
    !userId ||
    typeof userId !== "string" ||
    !email ||
    typeof email !== "string" ||
    !username ||
    typeof username !== "string"
  ) {
    return res.status(400).json("Invalid username or email");
  }

  try {
    const user = await prisma.user.create({
      data: {
        id: userId,
        email,
        username,
      },
    });
    res.json(user);
    
  } catch (error) {
    next(error);
  }
});

export { usersRouter };
