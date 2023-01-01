import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class StudentFilterArgs {
  @Field((type) => Int, { nullable: true })
  id?: number;
  @Field({ nullable: true })
  name?: string;
}
