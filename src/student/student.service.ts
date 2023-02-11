import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentDto } from './student.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    const student = this.studentRepository.create({
      ...createStudentDto,
      id: uuid(),
    });
    return this.studentRepository.save(student);
  }

  async getStudents() {
    return this.studentRepository.find();
  }

  async getStudent(id: string) {
    return this.studentRepository.findOneBy({ id });
  }

  async getManyStudents(ids: string[]) {
    const students = await this.studentRepository.find({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      where: { id: { $in: [...ids] } },
    });
    return students;
  }
}
