import { Request, Response, NextFunction } from "express";
import authService from "../service/auth-service";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error";

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const { login, password, name, country } = req.body;
      const userData = await authService.registration(
        login,
        password,
        name,
        country
      );
      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body;
      const userData = await authService.login(login, password);

      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json({ message: "Successfully logout" });
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
