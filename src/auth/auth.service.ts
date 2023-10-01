/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EditProfileDto } from './dto/edit-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { ChangeUserRoleDto } from './dto/changeUserRole.dto';
import { UserInfo } from 'src/models/userInfoModel';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { email, oldPassword, newPassword, confirmPassword } =
      changePasswordDto;

    //----> Check for password match.
    if (confirmPassword.normalize() !== newPassword.normalize()) {
      throw new BadRequestException(
        'New password does not match confirm password!',
      );
    }

    //----> Check for existence of user.
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException(`Invalid credentials!`);
    }

    //---> Check for validity of old password.
    const isValid = await bcrypt.compare(oldPassword, user.password);

    if (!isValid) {
      throw new UnauthorizedException(`Invalid credentials!`);
    }

    //----> Hash the new password.
    const hashPassword = await bcrypt.hash(newPassword, 12);

    //----> Insert the change in the database.
    const updatedUser = await this.prisma.user.update({
      where: { email },
      data: { ...user, password: hashPassword },
    });

    //----> Get new token.
    const token = this.jwt.sign({
      id: updatedUser.id,
      name: updatedUser.name,
      role: updatedUser.role,
    });

    //----> Don't send back the password.
    delete updatedUser.password;

    //----> Send back response.
    const userInfo = {
      message: 'Password updated successfully!',
      isLoggedIn: true,
      token,
      user: updatedUser,
    };

    return userInfo;
  }

  async editProfile(editProfileDto: EditProfileDto) {
    //----> Destructure the payload.
    const { email, password, ...rests } = editProfileDto;

    //----> Check for existence of user.
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    //----> Check for correctness of password.
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    //----> Store the change in the database.
    const updatedUser = await this.prisma.user.update({
      where: { email },
      data: { ...rests, email, password: user.password },
    });

    //----> Get new token.
    const token = this.jwt.sign({
      id: updatedUser.id,
      name: updatedUser.name,
      role: updatedUser.role,
    });

    //----> Don't send back the password.
    delete updatedUser.password;

    //----> Send back response.
    const userInfo = {
      message: 'User info updated successfully!',
      isLoggedIn: true,
      token,
      user: updatedUser,
    };

    return userInfo;
  }

  async login(loginDto: LoginDto) {
    //----> Destructure email and password from payload.
    const { email, password } = loginDto;

    //----> Check for existence of user.
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    //----> Check for correctness of password.
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    //----> Get new token.
    const token = this.jwt.sign({
      id: user.id,
      name: user.name,
      role: user.role,
    });

    //----> Don't send back the password.
    delete user.password;

    //----> Send back response.
    const userInfo = {
      message: 'Login successfully!',
      isLoggedIn: true,
      token,
      user: user,
    };

    return userInfo;
  }

  async signup(signupDto: SignupDto) {
    //----> Destructure email, password and confirm password from payload.
    const { email, password, confirmPassword, ...rests } = signupDto;

    //----> Check for password match.
    if (password.normalize() !== confirmPassword.normalize()) {
      throw new BadRequestException('Password must match!');
    }

    //----> Check for existence of user.
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) {
      throw new BadRequestException('Email is already in use!');
    }

    //----> Hash the password.
    const hashPassword = await bcrypt.hash(password, 12);

    //----> Save the new user in the database.
    const newUser = await this.prisma.user.create({
      data: { ...rests, email, password: hashPassword },
    });

    //----> Get new token.
    const token = this.jwt.sign({
      id: newUser.id,
      name: newUser.name,
      role: newUser.role,
    });

    //----> Don't send back the password.
    delete newUser.password;

    //----> Send back response.
    const userInfo = {
      message: 'Login successfully!',
      isLoggedIn: true,
      token,
      user: newUser,
    };

    return userInfo;
  }

  async changeUserRole(changeUserRoleDto: ChangeUserRoleDto, userDto: UserInfo){
    const {role: adminRole} = userDto; //----> Extract credentials of current user.

    //----> Check for admin rights.
    if (adminRole !== Role.Admin){
      throw new ForbiddenException("You are not permitted to perform this task!");
    }

    //----> Destructure email and role from payload.
    const {email, role} = changeUserRoleDto;

    //----> Check for existence of user.
    const user = await this.prisma.user.findUnique({where: {email}});

    if (!user){
      throw new UnauthorizedException("Invalid credential!");
    }

    //----> Insert the change in the database.
    const updatedUser = await this.prisma.user.update({where: {email}, data: {...user, role}})
  
    //----> Don't send back the password.
    delete updatedUser.password;

    //----> Send back the response.
    return updatedUser;
  }


}
