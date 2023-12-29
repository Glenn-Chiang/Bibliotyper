import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res.status(409).json({message: "Unique constraint violation"})
    }
  }

  res.status(500).json(err);
};
