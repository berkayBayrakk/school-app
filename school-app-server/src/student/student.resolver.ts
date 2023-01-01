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

@Resolver(() => StudentModel)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [StudentModel])
  async students() {
    return await this.studentService.getAllStudents();
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
  async posts(@Parent() student: StudentModel) {
    const { id } = student;
    return this.studentService.getPostsByStudentId(id);
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
}
