import UserModel from "../models/user-model";
import bcrypt from "bcrypt";
import tokenService from "./token-service";
import { UserDto } from "../dtos/user-dto";
import { ApiError } from "../exceptions/api-error";
import { isCountryCodeValid, saveToken } from "../utils";

class AuthService {
  async registration(
    login: string,
    password: string,
    name: string,
    country: string
  ) {
    const candidate = await UserModel.findOne({ login });

    if (candidate) {
      throw ApiError.BadRequest(`User with login ${login} already exists`);
    }

    if (!isCountryCodeValid(country)) {
      throw ApiError.BadRequest("Invalid country code");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      login,
      password: hashPassword,
      registrationDate: new Date(),
      name,
      country,
    });

    const userDto = new UserDto(user);
    return await saveToken(userDto);
  }

  async login(login: string, password: string) {
    const user = await UserModel.findOne({ login });
    if (!user) {
      throw ApiError.BadRequest("User wasn't found");
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest("Wrong password");
    }
    const userDto = new UserDto(user);
    return await saveToken(userDto);
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (
      !userData ||
      !tokenFromDb ||
      typeof userData === "string" ||
      userData instanceof String
    ) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    return await saveToken(userDto);
  }
}

export default new AuthService();
