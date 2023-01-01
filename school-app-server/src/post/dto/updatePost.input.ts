import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { CreatePostInput } from './createPost.input';

@InputType()
export class UpdatePostInput extends OmitType(CreatePostInput, [
  'studentId',
] as const) {}
