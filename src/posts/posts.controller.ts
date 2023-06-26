import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
    @Query('page') page: number = 1,
    perPage: number = 6,
  ) {
    try {
      const posts = await this.postsService.findAll(+page, perPage);
      const totalCount: number = await this.postsService.count();
      const totalPages: number = Math.ceil(totalCount / perPage);
      const info: IResponsePagination = {
        success: true,
        message: 'Posts found',
        currentPage: page,
        perPage,
        totalPages,
        totalCount,
        next:
          page >= totalPages ? null : `localhost:3000/posts?page=${page + 1}`,
        prev: page === 1 ? null : `localhost:3000/posts?page=${page - 1}`,
      };
      return new ResponsePagination<PostModel>(info, posts);
    } catch (error) {
      return new ResponseError(error.message, error);
    }
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    try {
      const post: PostModel = await this.postsService.findOne(+id);
      await this.postsService.update(+id, { views: post.views + 1 });
      if (!post) {
        return new ResponseError(`Post with id ${id} not found`, null);
      }
      return new ResponseSuccess<PostModel>('Post found', post);
    } catch (error) {
      return new ResponseError('Algo salio mal', error);
    }
  }

  @Get('featured')
  async findFeatured() {
    try {
      const posts = await this.postsService.findFeatured();
      return new ResponseSuccess<Array<PostModel>>('Posts found', posts);
    } catch (error) {
      return new ResponseError(error.message, error);
    }
  }

  @Get('user/:userId')
  async findAllByUser(
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    perPage: number = 10,
  ) {
    try {
      const posts = await this.postsService.findAllByUser(
        +userId,
        +page,
        perPage,
      );
      const totalCount: number = await this.postsService.count(+userId);
      const totalPages: number = Math.ceil(totalCount / perPage);
      const info: IResponsePagination = {
        success: true,
        message: 'Posts found',
        currentPage: +page,
        perPage,
        totalPages,
        totalCount,
        next:
          page >= totalPages
            ? null
            : `localhost:3000/posts/user/${userId}?page=${+page + 1}`,
        prev:
          page === 1
            ? null
            : `localhost:3000/posts/user/${userId}?page=${+page - 1}`,
      };
      return new ResponsePagination<PostModel>(info, posts);
    } catch (error) {
      return new ResponseError(error.message, error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      const update = await this.postsService.update(+id, updatePostDto);
      return new ResponseSuccess<PostModel>('Post updated', update);
    } catch (error) {
      return new ResponseError(error.message, error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.postsService.remove(+id);
      return new ResponseSuccess<PostModel>('Post deleted', null);
    } catch (error) {
      return new ResponseError(error.message, error);
    }
  }
}
