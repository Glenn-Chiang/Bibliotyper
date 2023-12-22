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

  if (!userId || typeof userId !== "string") {
    return res.status(400).json("Invalid userId");
  }
  if (time && typeof time !== "number") {
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
});

scoresRouter.post("/users/:userId/scores", async (req, res, next) => {
  const userId = Number(req.params.userId);
  const { wpm, accuracy, author, time } = req.body;

  if (
    !userId ||
    typeof userId !== "number" ||
    !wpm ||
    typeof wpm !== "number" ||
    !accuracy ||
    typeof accuracy !== "number" ||
    !author ||
    typeof author !== "string" ||
    !time ||
    typeof time !== "number"
  ) {
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
});

// Get user's high score under the selected timeLimit
scoresRouter.get("/users/:userId/highScore", async (req, res, next) => {
  const userId = Number(req.params.userId);
  const time = req.query.time ? Number(req.query.time) : undefined;

  if (!userId || typeof userId !== "string") {
    return res.status(400).json("Invalid userId");
  }
  if (time && typeof time !== "number") {
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
});

// Get top x highest scores across all users under the selected timeLimit
scoresRouter.get("/scores", async (req, res, next) => {
  const time = req.query.time ? Number(req.query.time) : undefined;

  if (time && typeof time !== "number") {
    return res.status(400).json("Invalid time");
  }

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

    res.json(scores);
  } catch (error) {
    next(error);
  }
});

export { scoresRouter };
