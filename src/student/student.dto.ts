import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateStudentDto {
  @IsString()
  @MinLength(3)
  @Field()
  firstname: string;
  @IsString()
  @MinLength(3)
  @Field()
  lastname: string;
}
