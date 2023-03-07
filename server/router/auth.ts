import express from "express";
import userController from "../controllers/auth-controller";
import { body } from "express-validator";

export const router = express.Router();

router.post(
  "/registration",
  body("login").notEmpty().withMessage("Login can't be empty"),
  body("password")
    .isLength({ min: 10, max: 50 })
    .withMessage("Password length should be from 10 to 50 symbols"),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
