import {
  Args,
  Info,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { PostService } from './post.service';
import { PostType } from './model/post.model';
import { CreatePostInput } from './dto/createPost.input';
import { UpdatePostInput } from './dto/updatePost.input';
import { StudentService } from 'src/student/student.service';

@Resolver(() => PostType)
export class PostResolver {
  constructor(
    private postService: PostService,
    private studentService: StudentService,
  ) {}

  @Query(() => [PostType])
  async posts() {
    return this.postService.getAllPosts();
  }

  @Query(() => PostType)
  async post(@Args('id', { type: () => Int }) id: number) {
    console.log(await this.postService.getPostById(id));
    return await this.postService.getPostById(id);
  }

  @ResolveField()
  async student(@Parent() post: PostType) {
    const { studentId } = post;
    return this.studentService.getStudentById(studentId);
  }

  @Mutation((returns) => PostType)
  async createPost(
    @Args('data', { type: () => CreatePostInput })
    data: CreatePostInput,
  ) {
    return await this.postService.createPost(data);
  }

  @Mutation((returns) => PostType)
  async updatePost(
    @Args('data', { type: () => UpdatePostInput })
    data: UpdatePostInput,
  ) {
    return await this.postService.updatePostById(data);
  }

  @Mutation((returns) => PostType)
  async deletePost(
    @Args('id', { type: () => Int })
    id: number,
  ) {
    return await this.postService.deletePostById(id);
  }
}
