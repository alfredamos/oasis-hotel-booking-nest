/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateCabinDto } from './dto/create-cabin.dto';
import { UpdateCabinDto } from './dto/update-cabin.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CabinsService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(createCabinDto: CreateCabinDto) {
    const newCabin = await this.prisma.cabin.create({
      data: { ...createCabinDto },
    });

    //----> Send back response.
    return newCabin;
  }

  async findAll() {
    const cabins = await this.prisma.cabin.findMany({});

    //----> Check for existence of cabins.
    if (!cabins || !cabins.length){
      throw new NotFoundException("cabins are not available in the database!");
    }

    //----> Send back the response.
    return cabins
  }

  async findOne(id: string) {
    //----> Retrieve the cabin with the given id.
    const cabin = await this.prisma.cabin.findUnique({where: {id}});

    //----> Check for existence of cabin.
    if (!cabin){
      throw new NotFoundException(`The cabin with id = ${id} is not found!`);
    }
    
    //----> Send back the response.
    return cabin;
  }

  async update(id: string, updateCabinDto: UpdateCabinDto) {
    //----> Retrieve the cabin with the given id.
    const cabin = await this.prisma.cabin.findUnique({ where: { id } });

    //----> Check for existence of cabin.
    if (!cabin) {
      throw new NotFoundException(`The cabin with id = ${id} is not found!`);
    }

    //----> Update the cabin data in the database.
    const updatedCabin = await this.prisma.cabin.update({where: {id}, data: {...updateCabinDto}});

    //----> Send back the response.
    return updatedCabin;
  }

  async remove(id: string) {
    //----> Retrieve the cabin with the given id.
    const cabin = await this.prisma.cabin.findUnique({ where: { id } });

    //----> Check for existence of cabin.
    if (!cabin) {
      throw new NotFoundException(`The cabin with id = ${id} is not found!`);
    }

    //----> Delete the cabin with the given id from database.
    const deletedCabin = await this.prisma.cabin.delete({where: {id}});

    //----> Send back the response.
    return deletedCabin;
  }
}
