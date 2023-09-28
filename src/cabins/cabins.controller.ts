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

@Controller('cabins')
export class CabinsController {
  constructor(private readonly cabinsService: CabinsService) {}

  @Post()
  create(@Body() createCabinDto: CreateCabinDto) {
    return this.cabinsService.create(createCabinDto);
  }

  @Get()
  findAll() {
    return this.cabinsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cabinsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCabinDto: UpdateCabinDto) {
    return this.cabinsService.update(id, updateCabinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cabinsService.remove(id);
  }
}
