/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { Student, Post, Prisma } from '@prisma/client';

import { StudentFilterArgs } from './args/student.filter.args';
import { CreateStudentInput } from './dto/createStudent.input';
import { EmailErrorType } from './model/emailError.model';

import { StudentsFilterArgs } from './args/students.filter.args';
import { StudentModel } from './model/student.model';
import { GetStudentInput } from './dto/getStudent.input';
import { CacheKey, RedisCacheService } from 'src/redis/redis.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationArgs } from 'src/common/pagination/pagination.args';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisServices: RedisCacheService,
  ) {}

  async getStudents({
    email,
    isInsensitive,
    name,
    limit,
    offset,
  }: StudentsFilterArgs): Promise<Student[]> {
    const obj = { equals: '' };
    const where: Prisma.StudentWhereInput = {
      OR: [
        {
          email: {
            contains: email,
            ...(isInsensitive ? { mode: 'insensitive' } : { endsWith: 'a' }),
          },
        },
        {
          name: {
            contains: name,
            ...(isInsensitive ? { mode: 'insensitive' } : {}),
          },
        },
      ],
    };
    return await this.prisma.student.findMany({
      where: where,
      skip: offset,
      take: limit,
    });
  }

  async getAllStudents({
    limit,
    offset,
  }: PaginationArgs): Promise<StudentModel[]> {
    const students = await this.prisma.student.findMany({
      orderBy: { id: 'asc' },
      skip: offset,
      take: limit,
    });

    return students;
  }

  async getStudent({ id, name }: GetStudentInput) {
    const where: Prisma.StudentFindFirstArgs = {
      where: { ...(name ? { name: name } : { id: id }) },
    };

    const cacheKey: CacheKey = {
      ...(!name
        ? { key: 'student', id: id }
        : { key: 'student:name', type: name }),
    };

    return await this.redisServices.get(
      cacheKey,
      async () => await this.prisma.student.findFirst(where),
    );
  }

  async getStudentById(id: number): Promise<Student> {
    return await this.redisServices.get(
      { key: 'student', id: id },
      async () => await this.prisma.student.findFirst({ where: { id: id } }),
    );
  }

  async createStudent(data: CreateStudentInput): Promise<Student> {
    const student = await this.prisma.student.upsert({
      create: { ...data },
      update: { ...data },
      where: { email: data.email },
    });
    await this.redisServices.set({ id: student.id, key: 'student' }, student);
    return student;
  }

  async getPostsByStudentId(
    studentId: number,
    { limit, offset }: PaginationArgs,
  ): Promise<Post[]> {
    console.log('studentId', studentId);
    const posts = await this.redisServices.get(
      { key: 'post:studentId', type: studentId.toString() },
      async () =>
        await this.prisma.post.findMany({
          where: { studentId: studentId },
          orderBy: { id: 'asc' },
        }),
    );

    return posts.slice((offset - 1) * limit, offset * limit).map((post) => {
      return {
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
      };
    });
  }

  async deleteStudentById(studentId: number): Promise<Student> {
    const student = await this.prisma.student.delete({
      where: { id: studentId },
    });
    await this.redisServices.del({ id: studentId, key: 'student' }, 'absolute');
    return student;
  }
}
