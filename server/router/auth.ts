import express from "express";
import authController from "../controllers/auth-controller";
import { body } from "express-validator";

export const authRouter = express.Router();

authRouter.post(
  "/registration",
  body("login").notEmpty().withMessage("Login can't be empty"),
  body("password")
    .isLength({ min: 10, max: 50 })
    .withMessage("Password length should be from 10 to 50 symbols"),
  authController.registration
);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);
