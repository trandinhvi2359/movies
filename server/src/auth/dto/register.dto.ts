import { Length } from 'class-validator';

export class RegisterDto {
  @Length(5, 300)
  name: string;

  @Length(5, 300)
  username: string;

  @Length(6, 300)
  password: string;
}
