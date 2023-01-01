import { Field, Int, InterfaceType } from '@nestjs/graphql';

@InterfaceType({
  isAbstract: true,
  description: 'Student interface',
})
export abstract class IStudent {
  @Field((type) => Int)
  id: number;
}
