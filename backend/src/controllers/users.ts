import { NextFunction, Request, Response, Router } from "express";
import { matchedData, validationResult } from "express-validator";
import { prisma } from "../lib/db.js";
import {
  validateUserId,
  validateUsername,
  validateEmail,
  validateUsernameQuery,
} from "../lib/validators.js";
import { validateRequest } from "../middleware/validateRequest.js";

const usersRouter = Router();

usersRouter.get(
  "/users",
  validateUsernameQuery(),
  validateRequest,
  async (req, res, next) => {
    const { username } = matchedData(req);

    const users = await prisma.user.findMany({
      where: {
        username,
      },
    });
    res.json(users);
  }
);

// Get user by id
usersRouter.get("/users/:userId", validateUserId(), validateRequest, async (req, res, next) => {
  try {
    const {userId} = matchedData(req)
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Create new user
usersRouter.post(
  "/users",
  validateEmail(),
  validateUsername(),
  validateUserId(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, email, username } = req.body;

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
  }
);

usersRouter.delete("/users", async (req, res, next) => {
  try {
    await prisma.user.deleteMany();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export { usersRouter };
