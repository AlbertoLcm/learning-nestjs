import { Prisma } from '@prisma/client';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto implements Prisma.UserCreateInput {
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
