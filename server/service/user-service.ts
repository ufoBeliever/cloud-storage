import { UpdateUserDto } from "../dtos/update-user-dto";
import userModel from "../models/user-model";
import { ApiError } from "../exceptions/api-error";
import { isCountryCodeValid } from "../utils";
import { UserDto } from "../dtos/user-dto";

class UserService {
  async getOne(login: string) {
    const user = await userModel.findOne({ login });
    if (!user) {
      return null;
    }
    return { ...new UserDto(user) };
  }

  async getAll() {
    const users = await userModel.find();
    return users.map((e) => {
      return { ...new UserDto(e) };
    });
  }

  async updateOne(id: string, body: UpdateUserDto) {
    if (!isCountryCodeValid(body.country)) {
      throw ApiError.BadRequest("Invalid country code");
    }

    await userModel.findByIdAndUpdate(id, body);
    return this.getOne(id);
  }

  async deleteOne(id: string) {
    await userModel.findByIdAndDelete(id);
  }
}

export default new UserService();
