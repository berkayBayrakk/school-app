import { ArgsType, Field, Int } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/pagination/pagination.args';

@ArgsType()
export class StudentsFilterArgs extends PaginationArgs {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ defaultValue: true })
  isInsensitive?: boolean;
}
