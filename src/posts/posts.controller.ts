import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { posts as PostModel } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): Promise<PostModel[]> {
    return this.postsService.getPosts();
  }

  @Post('create')
  createPost(
    @Body()
    post: {
      id: string;
      title: string;
      body?: string;
      description?: string;
      user_id: string;
    },
  ): Promise<PostModel> {
    return this.postsService.createPost(post);
  }

  @Put('update')
  updatePost(@Body() post: any) {
    this.postsService.updatePost();
  }

  @Get(':id')
  getPostsByUserId(@Param('id') id: string) {
    return this.postsService.getPostsByUserId(id);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    this.postsService.deletePost(Number(id));
  }
}
