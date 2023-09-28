import { PartialType } from '@nestjs/mapped-types';
import { CreateCabinDto } from './create-cabin.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateCabinDto extends PartialType(CreateCabinDto) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
