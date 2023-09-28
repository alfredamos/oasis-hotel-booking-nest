import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateCabinDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsPositive()
  maxCapacity: number;
  @IsNotEmpty()
  @IsPositive()
  regularPrice: number;
  @IsOptional()
  @IsPositive()
  discount: number;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsString()
  image?: string;
}
