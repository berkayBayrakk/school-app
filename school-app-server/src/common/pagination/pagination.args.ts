/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int, { defaultValue: 0, nullable: true })
  offset?: number;

  @Field((type) => Int, { defaultValue: 10, nullable: true })
  limit?: number;
}
