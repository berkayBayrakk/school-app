/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int)
  offset: number = 0;

  @Field((type) => Int)
  limit: number = 10;
}
