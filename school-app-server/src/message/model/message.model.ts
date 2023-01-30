import { Field, Int, ObjectType } from '@nestjs/graphql';
import { StudentModel } from 'src/student/model/student.model';

@ObjectType('Message')
export class MessageModel {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  sendTime: Date;

  @Field()
  receiverStudentId: number;

  @Field()
  senderStudentId: number;

  @Field(() => StudentModel)
  receiverStudent: StudentModel;

  @Field(() => StudentModel)
  senderStudent: StudentModel;
}
