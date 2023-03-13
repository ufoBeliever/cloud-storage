export class UpdateUserDto {
  name: string;
  country: string;

  constructor(model: any) {
    const { name, country } = model;

    this.name = name;
    this.country = country;
  }
}
