import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class StudentsFilterArgs {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ defaultValue: true })
  isInsensitive?: boolean;
}
