import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Student } from 'src/student/student.entity';
import { StudentService } from 'src/student/student.service';
import { StudentType } from 'src/student/student.type';
import { AssignStudentDto, CreateLessonDto } from './lesson.dto';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}
  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Query(() => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Mutation(() => LessonType)
  async createLesson(
    @Args('createLessonDto') createLessonDto: CreateLessonDto,
  ) {
    const lesson = await this.lessonService.createLesson(createLessonDto);
    return lesson;
  }

  @Mutation(() => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentDto') assignStudentDto: AssignStudentDto,
  ) {
    return this.lessonService.assignStudentsToLesson(assignStudentDto);
  }

  @ResolveField('students', () => [StudentType])
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    return this.studentService.getManyStudents(lesson.students);
  }
}
