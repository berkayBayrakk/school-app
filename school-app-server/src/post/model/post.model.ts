import {
  Field,
  Int,
  ObjectType,
  registerEnumType,
  GraphQLISODateTime,
  DateScalarMode,
} from '@nestjs/graphql';
import { COLOR } from 'src/common/enums/color.enum';
import { StudentModel } from 'src/student/model/student.model';

//graphql enums

registerEnumType(COLOR, {
  name: 'COLOR',
});

@ObjectType('Post')
export class PostType {
  @Field((type) => Int)
  id: number;

  @Field()
  text: string;

  @Field()
  color: COLOR;

  @Field((type) => Int)
  studentId: number;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => StudentModel, { nullable: true })
  student: StudentModel;
}
