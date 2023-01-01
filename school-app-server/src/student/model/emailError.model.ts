import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('EmailError')
export class EmailErrorType implements Error {
  constructor(message: string) {
    this.message = message;
    this.name = 'Email error';
  }
  @Field()
  name: string;
  @Field()
  stack?: string;
  @Field()
  message: string;
}
