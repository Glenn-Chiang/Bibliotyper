import { body, check } from "express-validator";

export const validateEmail = () =>
  body("email").isEmail().withMessage("Invalid email");

export const validateUsername = () =>
  body("username").trim().notEmpty().withMessage("Invalid username");

export const validateUserId = () =>
  body("userId").trim().notEmpty().withMessage("Invalid userId");


export const validateTimeParam = (time: any) => {
  return time && typeof time === "number";
};

export const validateScore = (score: any) => {
  const { wpm, accuracy, author, time } = score;

  return (
    wpm &&
    typeof wpm === "number" &&
    accuracy &&
    typeof accuracy === "number" &&
    author &&
    typeof author === "string" &&
    time &&
    typeof time === "number"
  );
};
