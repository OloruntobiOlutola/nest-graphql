import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateStudentDto } from './student.dto';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentDto') createStudentDto: CreateStudentDto,
  ) {
    return this.studentService.createStudent(createStudentDto);
  }

  @Query(() => [StudentType])
  async getStudents() {
    return this.studentService.getStudents();
  }

  @Query(() => StudentType)
  async getStudent(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }
}
