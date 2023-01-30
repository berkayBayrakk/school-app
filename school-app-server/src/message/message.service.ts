import { Injectable } from '@nestjs/common';
import { Message, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisCacheService } from 'src/redis/redis.service';
import { SendMessageInput } from './model/dto/sendMessage.input';
@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisServices: RedisCacheService,
  ) {}

  async getMessageById(id: number): Promise<Message> {
    return await this.prisma.message.findFirstOrThrow({
      where: { id },
    });
  }

  async sendMessage(data: SendMessageInput): Promise<Message> {
    return this.prisma.message.create({
      data: { ...data, sendTime: new Date() },
    });
  }
}
