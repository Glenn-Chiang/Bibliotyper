import { body, check, query } from "express-validator";

export const validateEmail = () =>
  body("email").isEmail().withMessage("Invalid email");

export const validateUsername = () =>
  body("username").trim().notEmpty().withMessage("Invalid username");

export const validateUsernameQuery = () =>
  query("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Invalid username");

export const validateUserId = () =>
  check("userId").trim().notEmpty().withMessage("Invalid userId");

export const validateTime = () =>
  check("time").isInt().toInt().withMessage("Invalid time param");

export const validateSortParam = () =>
  query("sort")
    .isIn(["newest", "highest"])
    .optional()
    .withMessage("Invalid sort param");

export const validateScore = () => [
  validateTime(),
  body("wpm").isInt().toInt(),
  body("accuracy").isInt().toInt(),
  body("author").trim().notEmpty(),
];
