import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { COLOR } from 'src/common/enums/color.enum';

@InputType()
export class CreatePostInput {
  @Field({ nullable: true })
  id?: number;
  @IsNotEmpty()
  @Field()
  text: string;

  @IsNotEmpty()
  @Field((type) => COLOR)
  color: COLOR;

  @IsNotEmpty()
  @Field()
  studentId: number;
}
