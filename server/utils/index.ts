import { countries } from "countries-list";
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

export const isCountryCodeValid = (country: string) => {
  if (!country) return true;
  return country in countries;
};
