import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLessonDto } from './lesson.dto';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}
  @Query(() => LessonType)
  lesson() {
    return {
      id: 'absc123',
      name: 'Physics',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }

  @Mutation(() => LessonType)
  async createLesson(createLessonDto: CreateLessonDto) {
    const lesson = await this.lessonService.createUser(createLessonDto);
    return lesson;
  }
}
