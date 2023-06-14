import { Prisma } from '@prisma/client';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePostDto implements Prisma.PostCreateInput {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  @IsEmail()
  authorEmail: string;
  @IsString()
  content?: string;
}
