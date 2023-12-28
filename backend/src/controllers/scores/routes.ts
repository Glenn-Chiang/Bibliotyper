import { Router } from "express";
import { prisma } from "../../lib/db.js";
import { RequestWithAuth } from "../../lib/types.js";
import {
  validateScore,
  validateTimeParam,
  validateUserId,
} from "../../lib/validators.js";
import { checkAuthorization } from "../../middleware/checkAuthorization.js";

const scoresRouter = Router();

// Get user's scores under the selected timeLimit, ordered from latest to oldest
scoresRouter.get(
  "/users/:userId/scores",
  checkAuthorization,
  async (req: RequestWithAuth, res, next) => {
    const userId = req.params.userId;
    const time = Number(req.query.time) || undefined;
    const sortParam = req.query.sort;
    const sort =
      sortParam === "newest" || sortParam === "highest" ? sortParam : undefined;

    if (!validateUserId(userId)) {
      return res.status(400).json("Invalid userId");
    }
    if (!validateTimeParam(time)) {
      return res.status(400).json("Invalid time");
    }

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
  }
);

scoresRouter.post(
  "/users/:userId/scores",
  checkAuthorization,
  async (req, res, next) => {
    const userId = req.params.userId;
    const { wpm, accuracy, author, time } = req.body;

    if (!validateUserId(userId)) {
      return res.status(400).json("Invalid userId");
    }
    if (!validateScore(req.body)) {
      return res.status(400).json("Invalid score data");
    }

    try {
      const score = await prisma.score.create({
        data: {
          userId,
          time,
          author,
          wpm,
          accuracy,
        },
      });

      res.json(score);
    } catch (error) {
      next(error);
    }
  }
);

// Get user's high score under the selected timeLimit
scoresRouter.get(
  "/users/:userId/highScore",
  checkAuthorization,
  async (req, res, next) => {
    const userId = req.params.userId;
    const time = req.query.time ? Number(req.query.time) : undefined;

    if (!validateUserId(userId)) {
      return res.status(400).json("Invalid userId");
    }
    if (!validateTimeParam(time)) {
      return res.status(400).json("Invalid time");
    }

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
  }
);

// Get top x highest scores across all users under the selected timeLimit
scoresRouter.get("/scores", async (req, res, next) => {
  const time = req.query.time ? Number(req.query.time) : undefined;
  if (!validateTimeParam(time)) {
    return res.status(400).json("Invalid time");
  }

  try {
    const scores = await prisma.score.groupBy({
      by: "userId",
      _max: {
        wpm: true,
      },

      where: {
        time,
      },
      orderBy: {
        _max: {
          wpm: "desc",
        },
      },
    });

    // Attach related users
    const scoresWithUsers = await Promise.all(
      scores.map(async (score) => {
        const user = await prisma.user.findUnique({
          where: {
            id: score.userId,
          },
        });
        return { ...score, user };
      })
    );

    res.json(scoresWithUsers);
  } catch (error) {
    next(error);
  }
});

export { scoresRouter };
