import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateSettingDto {
  @IsNotEmpty()
  @IsPositive()
  minBookingLength: number;
  @IsNotEmpty()
  @IsPositive()
  maxBookingLength: number;
  @IsNotEmpty()
  @IsPositive()
  guestsPerBooking: number;
  @IsNotEmpty()
  @IsPositive()
  breakfastPrice: number;
}
