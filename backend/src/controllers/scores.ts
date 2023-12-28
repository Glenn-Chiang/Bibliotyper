import { NextFunction, Request, Response, Router } from "express";
import { matchedData } from "express-validator";
import { prisma } from "../lib/db.js";
import {
  validateScore,
  validateSortParam,
  validateTime,
  validateUserId,
} from "../lib/validators.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import { validateRequest } from "../middleware/validateRequest.js";

const scoresRouter = Router();

// Get user's scores under the selected timeLimit, ordered from latest to oldest
scoresRouter.get(
  "/users/:userId/scores",
  checkAuthorization,
  validateUserId(),
  validateTime(),
  validateSortParam(),
  validateRequest,
  async (req, res, next) => {
    const { userId, time, sort } = matchedData(req);

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
  validateUserId(),
  validateScore(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const { wpm, accuracy, author, time } = req.body;

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
  validateUserId(),
  validateTime(),
  validateRequest,
  async (req, res, next) => {
    const { userId, time } = matchedData(req);

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
scoresRouter.get(
  "/scores",
  validateTime(),
  validateRequest,
  async (req, res, next) => {
    const { time } = matchedData(req);
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
  }
);

export { scoresRouter };
