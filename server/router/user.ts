import express from "express";
import userController from "../controllers/user-controller";
import multer from "multer";

export const usersRouter = express.Router();

usersRouter.get("/", userController.getAll);
usersRouter.get("/:login", userController.getOne);
usersRouter.put("/:id", userController.updateOne);
usersRouter.delete("/:id", userController.deleteOne);
usersRouter.put(
  "/avatar/:id",
  multer().single("file"),
  userController.updateAvatar
);
