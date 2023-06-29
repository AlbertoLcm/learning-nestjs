import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post, Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { v4 as generateID } from 'uuid';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(data: CreatePostDto): Promise<Post> {
    const { title, content, authorEmail } = data;
    return this.prisma.post.create({
      data: {
        id: generateID(),
        title,
        content,
        author: {
          connect: { email: authorEmail },
        },
      },
    });
  }

  async count(userId?: string): Promise<number> {
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

  findOne(id: string): Promise<Post> {
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
    userId: string,
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

  update(id: string, data: Prisma.PostUpdateInput) {
    return this.prisma.post.update({ data, where: { id } });
  }

  remove(id: string) {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
