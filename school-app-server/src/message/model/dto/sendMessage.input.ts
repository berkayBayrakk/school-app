import { Field, InputType, Int, OmitType } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
  @Field()
  title: string;

  @Field()
  senderStudentId: number;

  @Field()
  receiverStudentId: number;
}
