/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { StudentService } from './student.service';
import { StudentModel } from './model/student.model';
import { CreateStudentInput } from './dto/createStudent.input';
import { StudentFilterArgs } from './args/student.filter.args';
import { StudentsFilterArgs } from './args/students.filter.args';
import { GetStudentInput } from './dto/getStudent.input';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { PubSub } from 'graphql-subscriptions';
import { MessageModel } from 'src/message/model/message.model';
import { PubsubService } from 'src/pubSub/pubsub.service';

@Resolver(() => StudentModel)
export class StudentResolver {
  constructor(
    private studentService: StudentService,
    private pubSubsService: PubsubService,
  ) {}

  @Query(() => [StudentModel])
  async students(@Args() filter: PaginationArgs) {
    return await this.studentService.getAllStudents(filter);
  }

  @Query(() => StudentModel)
  async student(
    @Args('data', { type: () => GetStudentInput })
    data: GetStudentInput,
  ) {
    return await this.studentService.getStudent(data);
  }

  @Query(() => [StudentModel])
  async studentsSearch(@Args() filter: StudentsFilterArgs) {
    return await this.studentService.getStudents(filter);
  }

  @ResolveField()
  async posts(@Parent() student: StudentModel, @Args() filter: PaginationArgs) {
    const { id } = student;
    const posts = this.studentService.getPostsByStudentId(id, filter);
    return posts;
  }
  @ResolveField()
  async sendedMessages(@Parent() student: StudentModel) {
    const { id } = student;
    return await this.studentService.getSendedMessageByStudentId(id);
  }
  @ResolveField()
  async sendedMessagesTo(
    @Parent() student: StudentModel,
    @Args('toId', { type: () => Int }) toId: number,
  ) {
    const { id } = student;
    return await this.studentService.getSendedMessagesTo(id, toId);
  }

  @ResolveField()
  async receivedMessages(@Parent() student: StudentModel) {
    const { id } = student;
    return await this.studentService.getReceivedMessageByStudentId(id);
  }

  @Mutation((returns) => StudentModel)
  createStudent(
    @Args('data', { type: () => CreateStudentInput })
    data: CreateStudentInput,
  ) {
    const newStudent = this.studentService.createStudent(data);
    return newStudent;
  }

  @Mutation((returns) => StudentModel)
  deleteStudent(
    @Args('id', { type: () => Int })
    id: number,
  ) {
    const deletedStudent = this.studentService.deleteStudentById(id);
    return deletedStudent;
  }

  @Subscription(() => MessageModel)
  messageSendedd() {
    return this.pubSubsService.getPub().asyncIterator(`s`);
  }
}
