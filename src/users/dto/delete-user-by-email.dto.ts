/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserByEmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
