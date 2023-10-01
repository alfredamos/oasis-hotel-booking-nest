import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserInfo } from 'src/models/userInfoModel';
import { DeleteUserByEmailDto } from './dto/delete-user-by-email.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('Admin', 'Guest', 'Staff')
  @Get('current-user')
  currentUser(@CurrentUser() user: UserInfo) {
    this.usersService.currentUser(user);
  }

  @Roles('Admin')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles('Admin')
  @Delete('users-by-email')
  deleteUserByEmail(@Body() deleteByEmailDto: DeleteUserByEmailDto) {
    return this.usersService.deleteUserByEmail(deleteByEmailDto);
  }

  @Roles('Admin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles('Admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Roles('Admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles('Admin')
  @Delete(':id')
  removeUserById(@Param('id') id: string) {
    return this.usersService.removeUserById(id);
  }
}
