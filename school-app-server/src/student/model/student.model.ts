import {
  Field,
  Int,
  ObjectType,
  ArrayElement,
  Directive,
} from '@nestjs/graphql';
//error
import { PostType } from 'src/post/model/post.model';

import { IsEmail } from 'class-validator';
import { IStudent } from '../interface/student.interface';

//extends provides avoiding circular dependency between student and post

@Directive('@extends')
@ObjectType('Student', { implements: [IStudent] })
export class StudentModel extends IStudent {
  @Field()
  email: string;

  @Field({
    nullable: true,
  })
  name?: string;

  @Field((type) => [PostType], { nullable: 'items' })
  posts?: PostType[];
}
