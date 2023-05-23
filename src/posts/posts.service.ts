import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, posts, users } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async getPosts(): Promise<posts[]> {
    return this.prisma.posts.findMany();
  }

  async getPostById(id: number) {
    return 'Post with id: ' + id;
  }

  async getPostsByUserId(user_id: string) {
    const usuariosConArticulos = await this.prisma.posts.findMany({
      // TODO: Investigar por qué no funciona el include
    });

    return usuariosConArticulos;
  }

  async createPost(data: Prisma.postsCreateInput): Promise<posts> {
    return this.prisma.posts.create({
      data,
    });
  }

  async updatePost() {
    return 'Updating post...';
  }

  async deletePost(id: number) {
    return 'Deleting post with id: ' + id;
  }
}
