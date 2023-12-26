import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { RequestWithAuth } from "../lib/types.js";

export const verifyToken = async (
  req: RequestWithAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    // console.log("token", token);
    const decodedToken = token ? await getAuth().verifyIdToken(token) : null;
    // console.log("decoded token", decodedToken);
    const userId = decodedToken?.uid;
    // console.log("userId", userId);
    req.userId = userId;
    next();
  } catch (error) {
    console.log((error as Error))
    return res.status(401).json({ error: "Unauthorized: Invalid id token" });
  }
};
