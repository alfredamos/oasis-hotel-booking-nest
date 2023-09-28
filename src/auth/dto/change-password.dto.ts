/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
  @IsNotEmpty()
  @IsString()
  newPassword: string;
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
