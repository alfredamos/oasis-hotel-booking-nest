/* eslint-disable prettier/prettier */
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class ChangeUserRoleDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsEnum(Role)
  role: Role;
}
