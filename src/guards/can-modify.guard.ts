/* eslint-disable prettier/prettier */
import { UserInfo } from './../models/auth-user';
import { Reflector } from '@nestjs/core';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UuidTool } from 'uuid-tool';
import { Role } from '@prisma/client';

@Injectable()
export class CanModifyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getClass(),
      context.getHandler(),
    ]);

    //----> Public resources.
    if (isPublic) return true;

    //----> Get the authorization request object.
    const request = context.switchToHttp().getRequest();
    const { id } = request.params; //----> Get the booking id request to modify.

    //----> Get the booking request from database.
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    //----> Check for existence of booking request.
    if (!booking) {
      throw new NotFoundException('booking request does not exist');
    }

    //----> get the user information
    const user = request.user as UserInfo;

    //----> Check for existence of user.
    if (!user) {
      throw new ForbiddenException('Invalid credentials.');
    }

    //----> Get the user id from user authorization payload.
    const userIdFromAuthPayload = user.id;

    //----> Get the user id from booking request.
    const userIfFromBookingRequest = booking.userId;

    //----> Check for the equality of user id from booking request and the one from auth payload.
    const isSameUser = UuidTool.compare(
      userIdFromAuthPayload,
      userIfFromBookingRequest,
    );

    //----> Check if the user is an admin.
    //const isAdmin = user.userType === UserType.Admin;
    const isAdmin = user.role === Role.Admin
   
    //----> Only Admin or same user is allowed.
    const canModify = isAdmin || isSameUser;

    return canModify;
  }
}
