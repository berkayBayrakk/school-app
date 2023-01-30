import {
  Args,
  Info,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubsubService } from 'src/pubSub/pubsub.service';
import { MessageService } from './message.service';
import { SendMessageInput } from './model/dto/sendMessage.input';

import { MessageModel } from './model/message.model';

@Resolver(() => MessageModel)
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    private pubSubsService: PubsubService,
  ) {}

  @Query(() => MessageModel)
  async message(@Args('id', { type: () => Int }) id: number) {
    return await this.messageService.getMessageById(id);
  }
  @Mutation(() => MessageModel)
  async sendMessage(
    @Args('data', { type: () => SendMessageInput }) data: SendMessageInput,
  ) {
    const message = await this.messageService.sendMessage(data);

    this.pubSubsService
      .getPub()
      .publish(
        `sender${data.senderStudentId}receiver${data.receiverStudentId}`,
        { messageSended: message },
      );
    return message;
  }

  @Subscription(() => MessageModel)
  messageSended(
    @Args('sender', { type: () => Int }) senderId: number,
    @Args('receiver', { type: () => Int }) receiverId: number,
  ) {
    return this.pubSubsService
      .getPub()
      .asyncIterator(`sender${senderId}receiver${receiverId}`);
  }
}
