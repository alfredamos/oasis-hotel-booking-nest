import { PartialType } from '@nestjs/mapped-types';
import { CreateSettingDto } from './create-setting.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
