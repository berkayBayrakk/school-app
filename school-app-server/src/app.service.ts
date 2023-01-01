/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }
  async getStudents() {
    return await this.prisma.student.findMany();
  }

  async getPosts(id: number) {
    return await this.prisma.post.findMany({
      where: { studentId: id },
      orderBy: { id: 'asc' },
    });
  }
}
