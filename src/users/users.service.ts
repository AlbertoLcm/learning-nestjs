import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import { v4 as generateID } from 'uuid';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: RegisterUserDto): Promise<User> {
    const { password, email, name } = data;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return await this.prisma.user.create({
      data: {
        id: generateID(),
        password: hash,
        email,
        name,
      },
    });
  }
}
