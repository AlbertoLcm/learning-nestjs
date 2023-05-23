import { IsString } from 'class-validator'

export class Post {
  id: number;
  @IsString()
  title: string;
  description: string;
}