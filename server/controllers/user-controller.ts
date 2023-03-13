import { NextFunction, Request, Response } from "express";
import { UpdateUserDto } from "../dtos/update-user-dto";
import userService from "../service/user-service";
import authService from "../service/auth-service";
import { ApiError } from "../exceptions/api-error";

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { login } = req.params;
      const user = await userService.getOne(login);
      if (!user) {
        throw ApiError.NotFound();
      }
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userBody = { ...new UpdateUserDto(req.body) };

      const user = await userService.updateOne(id, userBody);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await userService.deleteOne(id);
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json({ message: "Successfully deleted" });
    } catch (e) {
      next(e);
    }
  }

  async updateAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.file);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
