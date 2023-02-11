import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Lesson } from 'src/lesson/lesson.entity';
import { Student } from 'src/student/student.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DB_URL,
  synchronize: true,
  useUnifiedTopology: true,
  entities: [Lesson, Student],
};
