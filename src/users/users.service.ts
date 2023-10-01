import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserInfo } from 'src/models/userInfoModel';
import { UuidTool } from 'uuid-tool';
import { DeleteUserByEmailDto } from './dto/delete-user-by-email.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: { ...createUserDto },
    });

    //----> Don't send back the password.
    delete newUser.password;

    //----> Send back response.
    return newUser;
  }

  async currentUser(user: UserInfo) {
    //----> Get the current user id.
    const userId = user?.id;

    //----> Check for correct id.
    const isValidId = UuidTool.isUuid(userId);
    if (!isValidId) {
      throw new BadRequestException('Invalid userId');
    }

    //----> Get the current user from database.
    const userCurrent = await this.findOne(userId);
    if (!userCurrent) {
      throw new NotFoundException(
        `The user with id = ${userId} doesn't exist!`,
      );
    }

    //----> send back the response.
    return userCurrent;
  }

  async deleteUserByEmail(deleteByEmail: DeleteUserByEmailDto) {
    //----> Destructure email from the payload.
    const { email } = deleteByEmail;

    //----> Check for the existence of user with the given email.
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(
        `The user with email : ${email} doesn't exist! `,
      );
    }

    //----> Don't send back the password.
    delete user.password;

    //----> Remove the user from the database.
    const deletedUser = await this.prisma.user.delete({ where: { email } });

    //----> Send back response.
    return deletedUser;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({});

    //----> Check for existence of users.
    if (!users || !users.length) {
      throw new NotFoundException('users are not available in the database!');
    }

    //----> Send back the response.
    return users;
  }

  async findOne(id: string) {
    //----> Retrieve the user with the given id.
    const user = await this.prisma.user.findUnique({ where: { id } });

    //----> Don't send back the password.
    delete user.password;

    //----> Check for existence of user.
    if (!user) {
      throw new NotFoundException(`The user with id = ${id} is not found!`);
    }

    //----> Send back the response.
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    //----> Retrieve the user with the given id.
    const user = await this.prisma.user.findUnique({ where: { id } });

    //----> Check for existence of user.
    if (!user) {
      throw new NotFoundException(`The user with id = ${id} is not found!`);
    }

    //----> Update the user data in the database.
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });

    //----> Don't send back the password.
    delete updatedUser.password;

    //----> Send back the response.
    return updatedUser;
  }

  async removeUserById(id: string) {
    //----> Retrieve the user with the given id.
    const user = await this.prisma.user.findUnique({ where: { id } });

    //----> Check for existence of user.
    if (!user) {
      throw new NotFoundException(`The user with id = ${id} is not found!`);
    }

    //----> Delete the user with the given id from database.
    const deletedUser = await this.prisma.user.delete({ where: { id } });

    //----> Don't send back the password.
    delete deletedUser.password;

    //----> Send back the response.
    return deletedUser;
  }
}
