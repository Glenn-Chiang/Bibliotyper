import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { RequestWithAuth } from "../lib/types.js";

const auth = getAuth();

export const verifyToken = async (
  req: RequestWithAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = token ? await auth.verifyIdToken(token) : null;
    const userId = decodedToken?.uid;
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({error: "Unauthorized: Invalid id token"});
  }
};
