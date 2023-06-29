import { Prisma } from '@prisma/client';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePostDto implements Prisma.PostCreateInput {
  id: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  @IsEmail()
  authorEmail: string;
  @IsString()
  content?: string;
}
