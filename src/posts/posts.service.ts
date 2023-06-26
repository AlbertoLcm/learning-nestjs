import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post, Prisma } from '@prisma/client';
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
      },
    });
  }

  async count(userId?: number): Promise<number> {
    if (userId) {
      return await this.prisma.post.count({
        where: {
          authorId: userId,
        },
      });
    }
    return await this.prisma.post.count();
  }

  async findAll(page: number, perPage: number): Promise<Post[]> {
    return await this.prisma.post.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        author: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  findOne(id: number): Promise<Post> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  findFeatured(): Promise<Post[]> {
    return this.prisma.post.findMany({
      take: 3,
      orderBy: {
        views: 'desc',
      },
      include: {
        author: true,
      }
    });
  }

  async findAllByUser(
    userId: number,
    page: number,
    perPage: number,
  ): Promise<any> {
    return await this.prisma.post.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      where: {
        authorId: userId,
      },
      include: {
        author: true,
      },
    });
  }

  update(id: number, data: Prisma.PostUpdateInput) {
    return this.prisma.post.update({ data, where: { id } });
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
