import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async create(createSettingDto: CreateSettingDto) {
    const newSetting = await this.prisma.setting.create({
      data: { ...createSettingDto },
    });

    //----> Send back response.
    return newSetting;
  }

  async findAll() {
    const settings = await this.prisma.setting.findMany({});

    //----> Check for existence of settings.
    if (!settings || !settings.length) {
      throw new NotFoundException(
        'settings are not available in the database!',
      );
    }

    //----> Send back the response.
    return settings;
  }

  async findOne(id: string) {
    //----> Retrieve the setting with the given id.
    const setting = await this.prisma.setting.findUnique({ where: { id } });

    //----> Check for existence of setting.
    if (!setting) {
      throw new NotFoundException(`The setting with id = ${id} is not found!`);
    }

    //----> Send back the response.
    return setting;
  }

  async update(id: string, updateSettingDto: UpdateSettingDto) {
    //----> Retrieve the setting with the given id.
    const setting = await this.prisma.setting.findUnique({ where: { id } });

    //----> Check for existence of setting.
    if (!setting) {
      throw new NotFoundException(`The setting with id = ${id} is not found!`);
    }

    //----> Update the setting data in the database.
    const updatedSetting = await this.prisma.setting.update({
      where: { id },
      data: { ...updateSettingDto },
    });

    //----> Send back the response.
    return updatedSetting;
  }

  async remove(id: string) {
    //----> Retrieve the setting with the given id.
    const setting = await this.prisma.setting.findUnique({ where: { id } });

    //----> Check for existence of setting.
    if (!setting) {
      throw new NotFoundException(`The setting with id = ${id} is not found!`);
    }

    //----> Delete the setting with the given id from database.
    const deletedSetting = await this.prisma.setting.delete({ where: { id } });

    //----> Send back the response.
    return deletedSetting;
  }
}
