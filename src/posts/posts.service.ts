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

  async count(): Promise<number> {
    return this.prisma.post.count();
  }

  async findAll(page: number, perPage: number): Promise<Post[]> {
    return await this.prisma.post.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        id: 'desc',
      },
    });
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
      },
    });
  }

  update(id: number, data: Prisma.PostUpdateInput) {
    return this.prisma.post.update({ data, where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
