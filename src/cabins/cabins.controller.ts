/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CabinsService } from './cabins.service';
import { CreateCabinDto } from './dto/create-cabin.dto';
import { UpdateCabinDto } from './dto/update-cabin.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('cabins')
export class CabinsController {
  constructor(private readonly cabinsService: CabinsService) {}

  @Roles('Admin')
  @Post()
  create(@Body() createCabinDto: CreateCabinDto) {
    return this.cabinsService.create(createCabinDto);
  }

  @Roles('Admin', 'Guest', 'Staff')
  @Get()
  findAll() {
    return this.cabinsService.findAll();
  }

  @Roles('Admin', 'Guest', 'Staff')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cabinsService.findOne(id);
  }

  @Roles('Admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCabinDto: UpdateCabinDto) {
    return this.cabinsService.update(id, updateCabinDto);
  }

  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cabinsService.remove(id);
  }
}
