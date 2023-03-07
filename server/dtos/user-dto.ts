export class UserDto {
  login: string;
  id: string;
  constructor(model: any) {
    const { login, _id } = model;
    this.login = login;
    this.id = _id;
  }
}
