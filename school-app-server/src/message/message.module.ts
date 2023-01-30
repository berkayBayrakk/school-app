import { Module } from '@nestjs/common';
import { PubsubService } from 'src/pubSub/pubsub.service';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { MessageModel } from './model/message.model';

@Module({
  providers: [MessageModel, MessageResolver, MessageService, PubsubService],
})
export class MessageModule {}
