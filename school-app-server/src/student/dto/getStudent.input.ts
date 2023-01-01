import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class GetStudentInput {
  @Field((type) => Int, { nullable: true })
  id: number;

  @Field({
    nullable: true,
  })
  name: string;
}
