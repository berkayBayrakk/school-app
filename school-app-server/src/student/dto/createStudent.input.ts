import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field()
  @IsNotEmpty()
  @MinLength(6)
  @IsEmail()
  email: string;

  @Field()
  @MinLength(5)
  name?: string;
}
