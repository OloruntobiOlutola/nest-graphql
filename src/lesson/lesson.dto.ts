import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsDateString, MinLength, IsUUID } from 'class-validator';

@InputType()
export class CreateLessonDto {
  @IsString()
  @MinLength(3)
  @Field()
  name: string;
  @IsDateString()
  @Field()
  startDate: string;
  @Field()
  endDate: string;
  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}

@InputType()
export class AssignStudentDto {
  @IsUUID()
  @Field(() => ID)
  lessonId: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID])
  studentIds: string[];
}
