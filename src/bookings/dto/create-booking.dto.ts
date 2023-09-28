import { Status } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsPositive,
  IsEnum,
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  checkIn: Date;
  @IsNotEmpty()
  @IsString()
  checkOut: Date;
  @IsNotEmpty()
  @IsPositive()
  numNights: number;
  @IsNotEmpty()
  @IsPositive()
  numGuests: number;
  @IsNotEmpty()
  @IsPositive()
  cabinPrice: number;
  @IsNotEmpty()
  @IsPositive()
  extraPrice: number;
  @IsNotEmpty()
  @IsPositive()
  totalPrice: number;
  @IsEnum(Status)
  status: Status;
  @IsNotEmpty()
  @IsBoolean()
  hasBreakfast: boolean;
  @IsNotEmpty()
  @IsBoolean()
  isPaid: boolean;
  @IsNotEmpty()
  @IsString()
  observations: string;
  @IsNotEmpty()
  @IsUUID()
  cabinId: string;
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
