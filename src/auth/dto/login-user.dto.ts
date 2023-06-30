import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { RegisterUserDto } from './register-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class LoginUserDto  {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
