import { Router } from "express";
import { validationResult } from "express-validator";
import { prisma } from "../../lib/db.js";
import { validateEmail, validateUserId, validateUsername } from "./validators.js";

const usersRouter = Router();

usersRouter.get("/users", async (req, res, next) => {
  const username = req.query.username;
  if (username && typeof username !== "string") {
    return res.status(400).json("Invalid username");
  }

  const users = await prisma.user.findMany({
    where: {
      username,
    },
  });
  res.json(users);
});

// Create new user
usersRouter.post("/users", validateEmail(), async (req, res, next) => {
  const { userId, email, username } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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

usersRouter.delete("/users", async (req, res, next) => {
  try {
    await prisma.user.deleteMany();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export { usersRouter };

