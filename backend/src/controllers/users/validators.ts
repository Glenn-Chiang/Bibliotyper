import { body } from "express-validator";

export const validateEmail = () => body("email").isEmail().withMessage("Invalid email")
export const validateUsername = () => body("username").trim().notEmpty().withMessage("Invalid username")
export const validateUserId = () => body("userId").trim().notEmpty().withMessage("Invalid userId")
