import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostModel } from '@prisma/client';
import {
  ResponseError,
  ResponsePagination,
  ResponseSuccess,
} from 'src/common/dto/response.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { IResponsePagination } from 'src/common/interfaces/response-pagination.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createDraft(
    @Body() postData: CreatePostDto,
  ): Promise<IResponse<PostModel>> {
    try {
      const newPost: PostModel = await this.postsService.createPost(postData);
      return new ResponseSuccess<PostModel>('Post created', newPost);
    } catch (error) {
      return new ResponseError(error.message, error);
    }
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    perPage: number = 10,
  ) {
    const posts = await this.postsService.findAll(page, perPage);
    const totalCount: number = await this.postsService.count();
    const totalPages: number = Math.ceil(totalCount / perPage);
    const info: IResponsePagination = {
      success: true,
      message: 'Posts found',
      currentPage: page,
      perPage,
      totalPages,
      totalCount,
      next: page >= totalPages ? null : `localhost:3000/posts?page=${page + 1}`,
      prev: page === 1 ? null : `localhost:3000/posts?page=${page - 1}`,
    };
    return new ResponsePagination(info, posts);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.postsService.findAllByUser(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return 'This action updates a post';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
