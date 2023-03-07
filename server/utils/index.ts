import { UserDto } from "../dtos/user-dto";
import tokenService from "../service/token-service";

export const saveToken = async (userDto: UserDto) => {
  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};
