import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post, Prisma } from '@prisma/client';
import { PaginationInfo } from 'src/common/pagination/pagination-info.interface';
import { PaginatedResponse } from 'src/common/pagination/Paginated-response';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(data: CreatePostDto): Promise<Post> {
    const { title, content, authorEmail } = data;
    return this.prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { email: authorEmail },
        },
      }
    });
  }

  async findAll(page: number): Promise<any> {
    const perPage: number = 2;
    const totalCount: number = await this.prisma.post.count();
    const totalPages: number = Math.ceil(totalCount / perPage);

    const info: PaginationInfo = {
      currentPage: page,
      perPage,
      totalPages,
      totalCount,
      next: page >= totalPages ? null : `localhost:3000/posts?page=${page + 1}`,
      prev: page === 1 ? null : `localhost:3000/posts?page=${page - 1}`,
    }

    const posts = await this.prisma.post.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        id: 'desc',
      },
    });

    return new PaginatedResponse<Post>(info, posts);
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  async findAllByUser(userId: number): Promise<any> {
    // return this.prisma.user.findMany({
    //   include: {
    //     posts: true,
    //   },
    //   where: {
    //     id: userId,
    //   },
    // });
    return this.prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: true,
      }
    });
  }

  update(id: number, data: Prisma.PostUpdateInput) {
    return this.prisma.post.update({ data, where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
