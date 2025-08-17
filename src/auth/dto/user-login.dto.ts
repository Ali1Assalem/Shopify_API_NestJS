import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDTO {

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}