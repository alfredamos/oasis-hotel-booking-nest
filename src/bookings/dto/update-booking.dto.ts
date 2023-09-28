import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
