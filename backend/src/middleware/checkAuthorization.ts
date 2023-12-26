import { NextFunction, Response } from "express";
import { RequestWithAuth } from "../lib/types.js";

// Check if user who is making the request has access to this endpoint
// Users should only be able to access all their own scores, but can also access the list of high scores for each user
export const checkAuthorization = async (
  req: RequestWithAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const requestorId = req.userId;
    if (!requestorId || (userId && userId !== requestorId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
