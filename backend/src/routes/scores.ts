import { Router } from "express";
import { prisma } from "../db.js";

const scoresRouter = Router();

// Get user's scores under the selected timeLimit, ordered from latest to oldest
scoresRouter.get("/users/:userId/scores", async (req, res, next) => {
  const userId = Number(req.params.userId);
  const time = req.query.time ? Number(req.query.time) : undefined;
  const sortParam = req.query.sort;
  const sort =
    sortParam === "newest" || sortParam === "highest" ? sortParam : undefined;

  try {
    const scores = await prisma.score.findMany({
      where: {
        userId,
        time,
      },
      orderBy:
        sort === "highest"
          ? {
              wpm: "desc",
            }
          : {
              dateAdded: "desc",
            },
    });
    res.json(scores);
  } catch (error) {
    next(error);
  }
});

// Get user's high score under the selected timeLimit
scoresRouter.get("/users/:userId/highScore", async (req, res, next) => {
  const userId = Number(req.params.userId);
  const time = req.query.time ? Number(req.query.time) : undefined;

  try {
    const highScore = (
      await prisma.score.aggregate({
        _max: {
          wpm: true,
        },
        where: {
          userId,
          time,
        },
      })
    )._max;
    res.json(highScore);
  } catch (error) {
    next(error);
  }
});

// Get top x highest scores across all users under the selected timeLimit
scoresRouter.get("/scores", async (req, res, next) => {
  const time = req.query.time ? Number(req.query.time) : undefined;

  try {
    const scores = await prisma.score.findMany({
      where: {
        time,
      },
      include: {
        user: true,
      },
      orderBy: {
        wpm: "desc",
      },
    });
  
    res.json(scores)
  } catch (error) {
    next(error)
  }
});

export { scoresRouter };
