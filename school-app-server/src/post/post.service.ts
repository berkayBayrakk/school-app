import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostInput } from './dto/createPost.input';
import { UpdatePostInput } from './dto/updatePost.input';
import { RedisCacheService } from 'src/redis/redis.service';
import { Post } from '@prisma/client';
import { PostType } from './model/post.model';
@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisServices: RedisCacheService,
  ) {}

  async getAllPosts() {
    const posts = await this.prisma.post.findMany({ orderBy: { id: 'asc' } });
    posts.map(async (post) => {
      await this.redisServices.set({ id: post.id, key: 'post' }, post);
    });
    return posts;
  }

  async getPostById(id: number): Promise<Post> {
    const cachePost = await this.redisServices.get(
      { key: 'post', id: id },
      () => this.prisma.post.findUnique({ where: { id } }),
    );
    return {
      ...cachePost,
      updatedAt: new Date(cachePost.updatedAt),
      createdAt: new Date(cachePost.createdAt),
    };
  }

  async createPost(data: CreatePostInput) {
    const post = await this.prisma.post.create({
      data: { ...data },
    });
    await this.redisServices.del({
      key: 'post:studentId',
      type: post.studentId.toString(),
    });
    await this.redisServices.set({ id: post.id, key: 'post' }, post);
    return post;
  }

  async updatePostById(data: UpdatePostInput) {
    const post = await this.prisma.post.update({
      where: { id: data.id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    await this.redisServices.del(
      { key: 'post:studentId', type: post.studentId.toString() },
      'absolute',
    );
    await this.redisServices.set({ key: 'post', id: post.id }, post);
    return post;
  }

  async deletePostById(id: number) {
    await this.redisServices.del({ id: id, key: 'post' }, 'absolute');
    return await this.prisma.post.delete({ where: { id } });
  }
}
