import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignStudentDto, CreateLessonDto } from './lesson.dto';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(createLessonDto: CreateLessonDto) {
    const lesson = this.lessonRepository.create({
      ...createLessonDto,
      id: uuid(),
    });
    return this.lessonRepository.save(lesson);
  }

  async getLessons() {
    return this.lessonRepository.find();
  }

  async getLesson(id: string) {
    return this.lessonRepository.findOneBy({ id });
  }

  async assignStudentsToLesson(assignStudentDto: AssignStudentDto) {
    const { lessonId, studentIds } = assignStudentDto;
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
