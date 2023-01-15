import { InputType, Field, Int } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/pagination/pagination.args';

@InputType()
export class GetStudentInput {
  @Field((type) => Int, { nullable: true })
  id: number;

  @Field({
    nullable: true,
  })
  name: string;
}
