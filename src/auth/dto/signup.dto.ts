/* eslint-disable prettier/prettier */
import { Gender } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
/* eslint-disable prettier/prettier */
export class SignupDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
  @IsEnum(Gender)
  gender: Gender;
}